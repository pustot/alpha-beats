import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function FlashCard({char, roma}) {
    return (
        <Card onClick={()=>window.open(toLink)}> 
            <CardActionArea>
              <CardContent>
                <Typography variant="h3" color="text.secondary"  align="center">
                  {roma}
                </Typography>
                <Typography variant="h1"  align="center">
                  {char}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
    );
};