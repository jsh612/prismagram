// 해당 파일은 사용 되지 않지만 fragment 작성 방법 보려고 작성해둠

export const USER_FRAGMENT = `
    id
    username
    avatar
`;

export const COMMENT_FRAGMENT = `
    id
    text
    user {
        ${USER_FRAGMENT}
    }
`;

export const FILE_FRAGMENT = `
    id
    url
`;

export const FULL_POST_FRAGMENT = `
    fragment PostParts on Post {
        id
        caption
        location
        files {
            ${FILE_FRAGMENT}
        }
        user {
            ${USER_FRAGMENT}
        }
        comments {
            ${COMMENT_FRAGMENT}
        }
    }
`;

export const MESSAGE_FRAGMENT = `
    id
    text
    to {
        ${USER_FRAGMENT}
    }
    from {
        ${USER_FRAGMENT}
    }
`;

export const ROOM_FRAGMENT = `
    fragment RoomParts on Room {
        id
        participants {
            ${USER_FRAGMENT}
        }
        messages {
            ${MESSAGE_FRAGMENT}
        }
    }
`;
