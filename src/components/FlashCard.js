import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function FlashCard({char, roma, isLarge}) {
    return (
        <Card onClick={()=>window.open(toLink)}> 
            <CardActionArea>
              <CardContent>
                <Typography variant="h3" color="text.secondary"  align="center" sx={{ fontSize: isLarge? 100: 50 }}>
                  {roma}
                </Typography>
                <Typography variant="h1"  align="center" sx={{ fontSize: isLarge? 300: 200 }}>
                  {char}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
    );
};