import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface ItemProps {
  id: number;
  name: string;
  spriteUrl: string;
}

const Item = ({ id, name, spriteUrl }: ItemProps): React.ReactElement => {
  return (
    <Card className="w-[250px] h-[250px] flex flex-col items-center">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription className="text-center">#{id}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={spriteUrl} alt={name} />
      </CardContent>
    </Card>
  );
};

export default Item;
