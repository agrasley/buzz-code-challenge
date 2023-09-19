import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { ImageListItemBar, Typography } from "@mui/material";

async function fetchFeed(tags) {
  const result = await fetch(`http://localhost:3001/feed?tags=${tags}`);
  return result.json();
}

export default function Images({ tags }) {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchIt = async () => {
      setHasError(false);
      setIsLoading(true);
      try {
        const feed = await fetchFeed(tags);
        setImages(feed);
      } catch (e) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchIt();
  }, [setImages, tags, setIsLoading, setHasError]);

  if (hasError) {
    return (
      <Typography variant="h6">
        Whoops! Something went wrong. Try reloading or searching again.
      </Typography>
    );
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  if (images.length === 0) {
    return (
      <Typography variant="h6">
        No images found with those tags! Try changing your search.
      </Typography>
    );
  }

  return (
    <Box sx={{ width: 1000, height: 750, overflowY: "scroll" }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {images.map((image) => (
          <a href={image.link} target="_blank">
            <ImageListItem key={image.link}>
              <img
                src={image.media.m.replace("m.jpg", "z.jpg")}
                alt={image.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={/\w/.test(image.title) ? image.title : "Untitled"}
              />
            </ImageListItem>
          </a>
        ))}
      </ImageList>
    </Box>
  );
}
