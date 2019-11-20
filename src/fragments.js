export const COMMENT_FRAGMENT = `
    fragment CommentsParts on Comment{
        id
        text
        user {
            username
        }
    }
`;
