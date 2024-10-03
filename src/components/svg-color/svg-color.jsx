import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// ----------------------------------------------------------------------

const SvgColor = forwardRef(({ src, sx, ...other }, ref) => (
    <Box
        component="span"
        className="svg-color"
        ref={ref}
        sx={{
            width: 24,
            height: 24,
            display: 'flex',
            alignitems: "center",
            justifyContent: "center",
            // bgcolor: 'currentColor',
            // mask: `url(${src}) no-repeat center / contain`,
            // WebkitMask: `url(${src}) no-repeat center / contain`,
            ...sx,
        }}

        flexDirection="column"
        {...other}>
        <i className={`bi bi-${src}`} style={{fontSize: "1.2rem"}}/>
    </Box>
));

SvgColor.propTypes = {
    src: PropTypes.string,
    sx: PropTypes.object,
};

export default SvgColor;
