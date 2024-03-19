// UserItemCard.jsx

import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

function UserItemCard({ item }) {
  return (
    <Card sx={{ maxWidth: 400, margin: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={item.imageUrl}
        alt={item.itemName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.itemName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Available Quantity: {item.quantity}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          One Day Price: {item.oneDayPrice}
        </Typography>
      </CardContent>
      <CardContent sx={{ textAlign: "right" }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: item.quantity > 0 ? "green" : "red",
            color: "white",
          }}
          disabled={item.quantity === 0}
        >
          {item.quantity > 0 ? "Available to Rent" : "Not Available"}
        </Button>
      </CardContent>
    </Card>
  );
}

export default UserItemCard;
