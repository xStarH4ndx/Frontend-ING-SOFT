import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { useRef } from "react";

type HeaderProps = {
    title: string;
    description: string;
    element?: React.ReactNode | null;
    contentRef: React.RefObject<HTMLDivElement>;
};

export const HeaderComponent: React.FC<HeaderProps> = ({ title, description, element, contentRef }) => {
    return (
        <div>
            <Box sx={{ width: "100%", height: "350px" }}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ height: "100%" }}
                >
                    <Grid item xs={5}>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ height: "100%" }}
                        >
                            <Grid item>
                                <Typography variant="h1">{title}</Typography>
                            </Grid>
                            <Grid sx={{ mt: 2 }} item>
                                <Typography>{description}</Typography>
                            </Grid>
                            {element !== undefined && <Grid sx={{ mt: 4, width: "100%" }} item>{element}</Grid>}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Divider sx={{ mb: 2 }} />
        </div>
    );
};
