import { useEffect, useMemo, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useTheme } from "./theme-provider";
import { LoaderCircle } from "lucide-react";

interface ItemProps {
  id: number;
  name: string;
  spriteUrl: string;
}

const Item = ({ id, name, spriteUrl }: ItemProps): React.ReactElement => {
  const [hasImageError, setHasImageError] = useState(false);
  const [loading, setLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const { theme } = useTheme();

  useEffect(() => {
    setHasImageError(false);
    setLoading(true);
  }, [id, name, spriteUrl]);

  const placeholderUrl = useMemo(() => {
    const bg = theme === "dark" ? "black" : "white";
    const fg = theme === "dark" ? "white" : "black";
    return `https://placehold.co/100/${bg}/${fg}?text=No Image`;
  }, [theme]);

  return (
    <Card className="w-[250px] h-[250px] flex flex-col items-center">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription className="text-center">#{id}</CardDescription>
      </CardHeader>
      <CardContent>
        {loading && <LoaderCircle className="animate-spin w-8 h-8" />}
        <img
          className={loading ? "hidden" : ""}
          ref={imgRef}
          src={hasImageError ? placeholderUrl : spriteUrl}
          alt={name}
          onLoad={() => {
            setLoading(false);
          }}
          onError={(_e) => {
            setHasImageError(true);
          }}
        />
      </CardContent>
    </Card>
  );
};

export default Item;
