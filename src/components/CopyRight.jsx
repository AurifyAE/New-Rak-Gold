import { Box, Typography } from "@mui/material";
import React from "react";

const CopyRight = () => {
    return (
        <Box
            sx={{
                width: "100%",
                height: { lg: "1vw", },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: "0.8vw",
                overflow: "hidden",
                background: "#01161B",
            }}
        >
            <Typography
                sx={{
                    color: "#e6e6e6",
                    fontSize: {
                        xs: "12px",
                        sm: "0.7vw",
                    },
                    fontWeight: 500,
                    letterSpacing: "0.08vw",
                }}
            >
                Copyrights © New RakGold Jewellery Trading L.L.C 1.0.2
            </Typography>
        </Box>
    );
};

export default CopyRight;
