import { Box, Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const CustomMap = ({ position }) => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
        }}>
            <Typography variant='h2' sx={{
                fontSize: "2rem",
                fontWeight: 700,
            }}>
                Location
            </Typography>
            <Typography variant='h5' marginBottom={2}>
            Lai Xiang Hui, 2nd Floor, Entrance 4, Gold Street, Wanda Plaza, Honggutan, China.
            </Typography>

            <Box sx={{
                width: '100%',
                maxWidth: '500px'
            }}>
                <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%', borderRadius: "10px"}}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            Lai Xiang Hui Restaurant
                        </Popup>
                    </Marker>
                </MapContainer>
            </Box>
        </Box>
    );
}

export default CustomMap;
