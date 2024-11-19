// global.d.ts

declare global {
  interface Window {
    ethereum?: import('ethers').Eip1193Provider;
  }
}

// Make sure this file is treated as a module to avoid TypeScript errors.
export {};
