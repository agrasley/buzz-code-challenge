import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useEffect, useState } from "react";

async function fetchFeed() {
  const result = await fetch("http://localhost:3001/feed");
  return result.json();
}

export default function Images() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    const fetchIt = async () => {
      const feed = await fetchFeed();
      setImages(feed);
      console.log(feed);
    };
    fetchIt();
  }, [setImages]);

  return (
    <Box sx={{ width: 500, height: 450, overflowY: "scroll" }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {images.map((image) => (
          <ImageListItem key={image.link}>
            <img
              //   srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={image.media.m}
              alt={image.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
