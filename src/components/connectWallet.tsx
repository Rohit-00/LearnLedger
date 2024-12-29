import  { useEffect, useState, useRef } from 'react';
import Web3 from "web3";
import { User } from 'lucide-react';
import { ABI } from '../web3/ABI';

declare global {
    interface Window {
      ethereum?: any;
    }
}

interface UserProfile {
    id: string;
    username: string;
    score: number;
}

export const ConnectWallet = () => {
    const [account, setAccount] = useState<string | null>(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const userProfile: UserProfile = {
        id: "USER123",
        username: "JohnDoe",
        score: 850
    };

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const initializeWeb3 = async () => {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);

                const accounts: string[] = await web3Instance.eth.getAccounts();
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    new web3Instance.eth.Contract(
                        ABI,
                        "0x56a2777e796eF23399e9E1d791E1A0410a75E31b"
                    );
                }
            }
        };

        initializeWeb3();
    }, []);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" });
                const web3Instance = new Web3(window.ethereum);

                const accounts: string[] = await web3Instance.eth.getAccounts();
                setAccount(accounts[0]);

                 new web3Instance.eth.Contract(
                    ABI,
                    "0x56a2777e796eF23399e9E1d791E1A0410a75E31b"
                );
            } catch (error) {
                console.error("Error connecting to wallet:", error);
            }
        } else {
            alert("MetaMask not found. Please install it!");
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {account ? (
                <>
                    <button
                        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                        onClick={toggleProfile}
                    >
                        <User size={24} />
                    </button>
                    
                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                            <div className="px-4 py-2 border-b">
                                <div className="text-sm text-gray-700">User ID: {userProfile.id}</div>
                                <div className="text-sm font-medium text-gray-900">{userProfile.username}</div>
                                <div className="text-sm text-gray-700">Score: {userProfile.score}</div>
                                <div className="text-sm text-gray-500 truncate mt-1">
                                    {account}
                                </div>
                            </div>
                            <a 
                                href="/profile" 
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                View Profile
                            </a>
                            <button 
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => {/* Add disconnect handler */}}
                            >
                                Disconnect Wallet
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <button
                    onClick={connectWallet}
                    className="text-gray-700 hover:text-gray-900"
                >
                    Sign in
                </button>
            )}
        </div>
    );
};