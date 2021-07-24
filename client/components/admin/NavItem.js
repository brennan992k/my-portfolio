import { Box, ListItem } from '@material-ui/core';
import { useRouter } from 'next/router';
import Link from '../Link'

const NavItem = ({ href, icon: Icon, title, ...rest }) => {
    const router = useRouter();
    return (
        <ListItem
            disableGutters
            sx={{ display: 'flex', py: 0 }}
            {...rest}
        >
            <Link href={href}>
                <Box
                    sx={{
                        color: 'text.secondary',
                        fontWeight: 'medium',
                        justifyContent: 'flex-start',
                        letterSpacing: 0,
                        py: 1.25,
                        textTransform: 'none',
                        width: '100%',
                        '& svg': {
                            mr: 1
                        }
                    }}

                >
                    {Icon && <Icon size="20" />}
                    <span>
                        {title}
                    </span>
                </Box>
            </Link>
        </ListItem>
    );
};

export default NavItem;
