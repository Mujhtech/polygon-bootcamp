// SPDX-License-Identifier: MIT

// Eventnexo Share struct

pragma solidity ^0.8.0;

library SharedStructs {
    // EEventStatus Struct
    enum EEventStatus {
        Start,
        End
    }

    // EEventStruct Struct
    struct EEventStruct {
        uint256 amount;
        string title;
        string image;
        string nftUri;
        string description;
        uint256 totalTicketBought;
        uint256 maxTickets;
        address owner;
        uint256 eventDate;
        EEventStatus ticketStatus;
    }

    struct ETicketStruct {
        uint256 eventId;
        uint256 quantity;
        address owner;
    }
}
