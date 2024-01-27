import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import Router, { useRouter } from "next/router";
import axios from 'axios';
import web3modal from 'web3modal';
import FormData from "form-data";
import { toast } from "react-hot-toast";
//INTERNAL
import { NFTMarketplaceAddress, NFTMarketplaceABI, INFURA_API_KEY, ETHEREUM_NETWORK, SIGNER_PRIVATE_KEY, ERC20Address, ERC20ABI } from "./constants";

// console.log(NFTMarketplaceAddress)
// console.log(NFTMarketplaceABI)
// console.log(INFURA_API_KEY)
//FETCHING SMART CONTRACT
const fetchNFTMarketplaceContract = (signerOrProvider) => new ethers.Contract(NFTMarketplaceAddress, NFTMarketplaceABI, signerOrProvider);
const fetchERC20Contract = (signerOrProvider) => new ethers.Contract(ERC20Address, ERC20ABI, signerOrProvider);
// console.log(NFTMarketplaceABI)

//---CONNECTING WITH SMART CONTRACT
const connectingWithSmartContract = async () => {
    try {
        const web3Modal = new web3modal();
        // console.log(web3Modal)
        const connection = await web3Modal.connect();
        // console.log(connection)
        const provider = new ethers.providers.Web3Provider(connection);
        // console.log(provider)
        const signer = provider.getSigner()
        // console.log(signer)
        const contract = fetchERC20Contract(signer)

        // const data = await contract.fetchMyNFT();
        // console.log('data', data)
        // console.log(contract)
        // const provider = new ethers.providers.JsonRpcProvider(INFURA_API_KEY);

        // const signer = provider.getSigner()

        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // await provider.send('eth_requestAccounts', []); // <- this promps user to connect metamask
        // const signer = provider.getSigner();
        // const wallet = new ethers.Wallet(SIGNER_PRIVATE_KEY, provider);
        // console.log(wallet)
        // const signer = wallet.provider.getSigner(wallet.address);
        // console.log(signer)
        // const contract = fetchNFTMarketplaceContract(signer)
        // console.log(contract)

        return { contract, signer, provider };
    } catch (error) {
        console.log('Something error', error.message)
    }
}

// connectingWithSmartContract()
export const NFTMarketplaceContext = React.createContext();


export const NFTMarketplaceProvider = ({ children }) => {
    const titleData = "Discover, collect, and sell NFTs"; //titleData

    const [error, setError] = useState("")
    const [openError, setOpenError] = useState(false)

    //====USESTATE
    const [currentAccount, setCurrentAccount] = useState("");
    const router = useRouter()
    const supportedWallets = [
        { type: "metamask", name: "MetaMask" },
        { type: "phantom", name: "Phantom" },
        { type: "rabby", name: "Rabby" },
        // Thêm các loại ví khác nếu cần
    ];
    const [selectedWalletType, setSelectedWalletType] = useState("");

    ////====CHECK IF WALLET IS CONNECTD 
    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) {
                toast.error("Install Metamask");
                // console.log("Install Metamask");
                // Reload trang khi không có Metamask
                // location.reload();
                return;
            }

            const accounts = await window.ethereum.request({
                method: "eth_accounts"
            });

            if (accounts.length) {
                setCurrentAccount(accounts[0])
                // console.log(currentAccount)
            } else {
                console.log("No Account");
                // Reload trang khi không có tài khoản

            }

        } catch (error) {
            toast.error("Something wrong while connecting to wallet")
            console.log("Something wrong while connecting to wallet");
            // Reload trang khi có lỗi

        }
    };

    const handleAccountsChanged = (accounts) => {
        if (accounts.length == 0) {
            setCurrentAccount('')
        } else {
            setCurrentAccount(accounts[0]);
        }
    };

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
        }
        // checkIfWalletConnected();
    }, [handleAccountsChanged, checkIfWalletConnected])
    // -------connect wallet
    const connectWallet = async (walletType) => {
        try {
            if (!window.ethereum) return setOpenError(true), setError("Install a supported wallet");

            let method;
            switch (walletType) {
                case "metamask":
                    method = "eth_requestAccounts";
                    break;
                case "phantom":
                    // Cài đặt phương thức kết nối cho Phantom
                    method = "phantom_specific_method";
                    break;
                case "rabby":
                    // Cài đặt phương thức kết nối cho Rabby
                    method = "rabby_specific_method";
                    break;
                // Thêm các case cho các loại ví khác
                default:
                    setError("Unsupported wallet type");
                    setOpenError(true);
                    return;
            }

            const accounts = await window.ethereum.request({
                method: method
            });

            setCurrentAccount(accounts[0]);
            setSelectedWalletType(walletType); // Lưu loại ví được chọn
            // window.location.reload();

        } catch (error) {
            toast.error(error.message)
        }
    };

    // ----upload IPFS----------
    const uploadToIPFS = async (file) => {
        try {
            // console.log(123, file);
            let response;
            let url;
            if (file) {
                const formData = new FormData();
                formData.append("file", file);

                response = await axios({
                    method: "post",
                    url: "https://contract.cam.eclo.io/upload",
                    data: formData,
                })

                url = response.data.data
            }

            return url;
        } catch (error) {
            toast.error(error.message)

        }
    }

    // ----create function
    const createNFT = async (name, price, image, description, router) => {
        // const { name, description, price } = formInput;
        if (!name || !description || !price || !image)
            return console.log("Data is missing");

        const data = { name, description, link: image }
        try {

            const response = await axios.post("https://contract.cam.eclo.io/contract/mintNFT", data);
            // console.log(response.data.data)
            const url = response.data.data
            await createSale(url, price)
            router.push('/searchPage')
        } catch (error) {
            toast.error('error.message')

        }
    }

    // ---createSale function-----
    const createSale = async (url, formInputPrice, isReselling, id) => {
        try {
            const price = ethers.utils.parseUnits(formInputPrice.toString(), 9);
            const { contract, signer } = await connectingWithSmartContract();
            const listingPrice = await contract.getListingPrice();
            const contractERC20 = fetchERC20Contract(signer);
            const allowance = await contractERC20.allowance(currentAccount, NFTMarketplaceAddress);
            if (!isReselling) {
                if (allowance < price) {
                    await contractERC20.approve(NFTMarketplaceAddress, price * 10);
                }
            }

            const transaction = !isReselling
                ? await contract.createToken(url, price)
                : await contract.resellToken(id, price);
            await transaction.wait();
            // console.log(transaction)
        } catch (error) {
            toast.error(error.error.data.message)
            setError(`error createSale ${error.error.data.message}`);
            setOpenError(true)
        }
    }

    // -----fetchNFTs---------

    const fetchNFTs = async () => {
        try {
            // const provider = new ethers.providers.JsonRpcProvider(INFURA_API_KEY);
            // console.log(provider)
            const { contract, signer } = await connectingWithSmartContract();
            // const contract = fetchNFTMarketplaceContract(provider)
            // console.log('contract', contract)
            const data = await contract.fetchMarketItems();
            // console.log('data', data);
            const items = await Promise.all(
                data.map(async ({ tokenId, seller, owner, price: unformattedPrice, bid, list, sold }) => {
                    const tokenURI = await contract.tokenURI(tokenId);
                    // console.log('tokenURI', tokenURI)
                    const {
                        data: { image, name, description },
                    } = await axios.get(tokenURI);
                    // console.log('data tokenURI', data)
                    const price = ethers.utils.formatUnits(unformattedPrice.toString(), 9);

                    return {
                        price,
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenURI,
                        bid,
                        list,
                        sold
                    }
                })
            );
            return items;
        } catch (error) {
            toast.error(error.message)
        }
    }

    // useEffect(() => {
    //     fetchNFTs()
    // }, [])
    // ------fetchNFTS my nft or listed nfts---------

    const fetchMyNFTsOrListedNFTS = async (type) => {
        try {
            const { contract, signer } = await connectingWithSmartContract();
            // console.log('fetchMyNFTsOrListedNFTS', type)
            const data = type === "fetchItemsListed"
                ? await contract.fetchItemsListed()
                : type === "fetchMyNFTs"
                    ? await contract.fetchMyNFTs()
                    : await contract.fetchItemsAuction();


            // console.log('fetchMyNFTsOrListedNFTS', type, data)

            const items = await Promise.all(
                data.map(async ({ tokenId, seller, owner, price: unformattedPrice, bid, list, sold }) => {
                    const tokenURI = await contract.tokenURI(tokenId)
                    const {
                        data: { image, name, description },
                    } = await axios.get(tokenURI);
                    const price = ethers.utils.formatUnits(unformattedPrice.toString(), 9);
                    //ethers.utils.formatUnits(unformattedPrice.toString(), "ether");

                    return {
                        price,
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenURI,
                        bid,
                        list,
                        sold
                    }
                })
            );
            return items;
        } catch (error) {
            toast.error(error.message)
        }
    }

    // -------buy nfts --------------------

    const buyNFT = async (NFTData) => {
        try {

            const { contract, signer } = await connectingWithSmartContract();
            const price = ethers.utils.parseUnits(NFTData.price.toString(), 9);
            const contractERC20 = fetchERC20Contract(signer);

            const a = await contractERC20.balanceOf(currentAccount);

            const allowance = await contractERC20.allowance(currentAccount, NFTMarketplaceAddress);
            // console.log("price", allowance)
            if (allowance < price) {
                await contractERC20.approve(NFTMarketplaceAddress, price);
            }


            const transaction = await contract.createMarketSale(NFTData.tokenId)

            await transaction.wait();

            router.push("/author")

        } catch (error) {
            if (error.message.includes("user rejected transaction")) {
                // Lấy nội dung của lỗi "user rejected transaction"
                const userRejectedErrorMessage = "user rejected transaction";
                toast.error(userRejectedErrorMessage)
            } else {
                // Xử lý các loại lỗi khác
                console.error("Đã xảy ra lỗi:", error);
            }
            //     console.log(error);
            //     setError(`error buyNFT ${error}`);
            //    setOpenError(true)
        }
    }

    const transferNFT = async (formInputAddress, id) => {
        try {
            console.log(formInputAddress, id)

            const { contract } = await connectingWithSmartContract();

            const address = formInputAddress
            // console.log("price", price)

            const transaction = await contract.TransferNFT(formInputAddress, id)
            await transaction.wait();
            router.push("/author")
        } catch (error) {
            toast.error(error.message)
        }
    }

    const owneOf = async (id) => {
        try {
            console.log(id)

            const { contract } = await connectingWithSmartContract();

            const data = await contract.ownerOf(id)
            console.log("aaaaaaa", data);
            // await transaction.wait();
            return data;
            // router.push("/author")
        } catch (error) {
            toast.error(error.message)
        }
    }


    // Change Price------------------------------------
    const changePrice = async (formInputPrice, id) => {
        try {
            console.log('contract', formInputPrice, id)
            const { contract, signer } = await connectingWithSmartContract();
            const price = ethers.utils.parseUnits(formInputPrice.toString(), 9);
            // const contractERC20 = fetchERC20Contract(signer);

            const transaction = await contract.updateListPriceNFT(id, price);

            await transaction.wait();
            router.push("/author")
            // console.log(transaction)

        } catch (error) {
            // console.log(error.error.data.message)

            toast.error(error.message)
        }
    }

    // -------delete nft---------------------------------------------------
    const deleteItem = async (id) => {
        try {
            // console.log('contract', url, formInputPrice, isReselling, id)
            // const price = ethers.utils.parseUnits(formInputPrice, "ether");
            console.log(123123, id);
            const { contract, signer } = await connectingWithSmartContract();
            console.log(contract);
            // console.log('contract', contract)
            // const listingPrice = await contract.getListingPrice();
            // console.log(123, id, price.toString())
            const transaction = await contract.unlistNFT(id);

            await transaction.wait();
            router.push('/author')
            console.log(transaction)
        } catch (error) {
            toast.error(error.message)
            console.log("error delete", error.message);
        }
    }

    // -------createAuction nft---------------------------------------------------
    const createAuction = async (id, formInputPrice, customDate) => {
        try {
            // console.log('contract', id, formInputPrice, customDate)
            //  const timess =  ethers.utils.formatUnits(time)
            function dateToTimestamp(year, month, day) {
                const date = new Date(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T00:00:00Z`);
                // console.log(123123, date);
                return Math.floor(date.getTime() / 1000);
            }

            // const times = "2024-01-09";

            const [year, month, day] = customDate.toString().split('-').map(Number);

            const timestamp = dateToTimestamp(year, month, day);

            // console.log([year, month, day]);

            const uint256Value = ethers.BigNumber.from(timestamp);
            const time = uint256Value.toString()
            // console.log(123123123, uint256Value.toString());


            const price = ethers.utils.parseUnits(formInputPrice.toString(), 9);

            console.log(id, price, time);
            const { contract, signer } = await connectingWithSmartContract();
            // await contract.approve(NFTMarketplaceAddress, id);   
            // console.log('contract', contract)
            // const listingPrice = await contract.getListingPrice();
            // console.log(123, id, price.toString())
            const transaction = await contract.createAuction(id, price, time);
            await transaction.wait();
            router.push("/author")
            console.log(transaction)
        } catch (error) {
            toast.error(error.message)
        }
    }


    // Join auction--------------------------------
    const joinAuction = async (id, formInputPrice) => {
        try {
            // console.log('contract', id, formInputPrice, customDate)
            //  const timess =  ethers.utils.formatUnits(time)
            const _bid = ethers.utils.parseUnits(formInputPrice.toString(), 9);

            // console.log("Aaaaaaa", id, _bid);

            const { contract, signer } = await connectingWithSmartContract();

            const contractERC20 = fetchERC20Contract(signer);
            const allowance = await contractERC20.allowance(currentAccount, NFTMarketplaceAddress);

            // console.log("price", allowance)
            if (allowance < _bid) {
                await contractERC20.approve(NFTMarketplaceAddress, _bid * 2)
            }
            const a = await contract.getAuctionByTokenIdPresent(id);
            // console.log(a._tokenId)
            const transaction = await contract.joinAuction(a.auctionId, _bid);
            await transaction.wait();

            router.push("/author")
            // console.log(transaction)
        } catch (error) {
            toast.error(error.message)
        }
    }

    // --------get auction---------------
    const getAuction = async (id) => {
        try {
            // console.log(formInputAddress, id)

            const { contract } = await connectingWithSmartContract();

            // const address = formInputAddress
            // console.log("price", price)

            const data = await contract.getAuctionByTokenIdPresent(id)
            // await transaction.wait();
            const lastbid = data.lastBid;
            const bidder = data.lastBidder;
            const bid = ethers.utils.formatUnits(lastbid.toString(), 9)


            return { bid, bidder };
            // router.push("/author")
        } catch (error) {
            console.log("Error transfer", error);
            toast.error(error.message)
        }
    }



    const checkTokenBalance = async () => {
        try {

            // const price = ethers.utils.parseUnits(formInputPrice.toString(), 9);

            const { contract, signer, provider } = await connectingWithSmartContract();

            const contractERC20 = fetchERC20Contract(signer);
            const balanceWei = await contractERC20.balanceOf(currentAccount);

            const balanceToken = ethers.utils.formatUnits(balanceWei.toString(), 9);

            const roundedBalanceToken = parseFloat(balanceToken).toFixed(4);
            console.log('contract', balanceEth)
            return roundedBalanceToken;

        } catch (error) {
            console.log("error delete", error.message);
            toast.error(error.message)
        }
    }
    const checkEthBalance = async () => {
        try {

            // const price = ethers.utils.parseUnits(formInputPrice.toString(), 9);

            const { contract, signer, provider } = await connectingWithSmartContract();
            // console.log('contract', contract)
            const balanceWei = await provider.getBalance(currentAccount);
            console.log(123123, balanceWei);
            const balanceEth = ethers.utils.formatEther(balanceWei);
            const roundedBalanceEth = parseFloat(balanceEth).toFixed(4);

            return roundedBalanceEth;

        } catch (error) {
            console.log("error delete", error.message);
            toast.error(error.message)
        }
    }

    return (
        <NFTMarketplaceContext.Provider value={{
            // checkIfWalletConnected,
            connectWallet,
            uploadToIPFS,
            createNFT,
            fetchNFTs,
            createSale,
            fetchMyNFTsOrListedNFTS,
            buyNFT,
            changePrice,
            deleteItem,
            transferNFT,
            joinAuction,
            getAuction,
            currentAccount,
            titleData,
            owneOf,
            createAuction,
            setOpenError,
            openError,
            error,
            supportedWallets,
            setSelectedWalletType,
            selectedWalletType,
            checkTokenBalance,
            checkEthBalance
        }}>
            {children}
        </NFTMarketplaceContext.Provider>
    );
};