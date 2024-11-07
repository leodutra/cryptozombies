// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import {ERC721} from "./ERC721.sol";
import {ZombieAttack} from "./ZombieAttack.sol";

contract ZombieOwnership is ZombieAttack, ERC721 {
    function balanceOf(
        address _owner
    ) external view override returns (uint256) {
        return ownerZombieCount[_owner];
    }

    function ownerOf(
        uint256 _tokenId
    ) external view override returns (address) {
        return zombieToOwner[_tokenId];
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external payable override {}

    function approve(
        address _approved,
        uint256 _tokenId
    ) external payable override {}
}
