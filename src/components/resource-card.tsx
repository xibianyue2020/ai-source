import { Star, Play, Download, Heart, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ResourceCardProps {
  title: string;
  description: string;
  category: "提示词" | "MCP" | "Dify工具" | "工作流";
  rating: number;
  downloads: number;
  views: number;
  tags: string[];
  author: string;
  image?: string;
  featured?: boolean;
}

export function ResourceCard({ 
  title, 
  description, 
  category, 
  rating, 
  downloads, 
  views, 
  tags, 
  author, 
  image,
  featured = false 
}: ResourceCardProps) {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "提示词": return "bg-blue-100 text-blue-800";
      case "MCP": return "bg-green-100 text-green-800";
      case "Dify工具": return "bg-purple-100 text-purple-800";
      case "工作流": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-200 ${featured ? 'border-primary/20 shadow-md' : ''}`}>
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <ImageWithFallback
            src={image || "/api/placeholder/300/200"}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          />
          {featured && (
            <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
              精选
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge className={getCategoryColor(category)} variant="secondary">
            {category}
          </Badge>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{rating}</span>
          </div>
        </div>
        
        <h3 className="font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>by {author}</span>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Download className="h-4 w-4" />
              <span>{downloads}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex space-x-2">
        <Button size="sm" className="flex-1">
          <Play className="h-4 w-4 mr-1" />
          试运行
        </Button>
        <Button size="sm" variant="outline">
          <Heart className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline">
          <Download className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}