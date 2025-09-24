import { useState } from "react";
import { ArrowLeft, Star, Download, Heart, Eye, Share2, Play, RefreshCw, BookOpen, MessageCircle, Calendar, User, Tag } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ResourceCard } from "./resource-card";

interface ResourceDetailProps {
  onBack: () => void;
  resource: {
    id: string;
    title: string;
    description: string;
    category: "提示词" | "MCP" | "Dify工具" | "工作流";
    rating: number;
    downloads: number;
    views: number;
    tags: string[];
    author: string;
    image?: string;
    version: string;
    updatedAt: string;
    longDescription: string;
    documentation: string;
  };
}

const mockComments = [
  {
    id: 1,
    user: "张开发者",
    avatar: "/placeholder-avatar.jpg",
    rating: 5,
    comment: "非常实用的提示词模板，大大提升了我的写作效率！推荐给所有需要AI写作辅助的朋友。",
    date: "2025-01-15",
  },
  {
    id: 2,
    user: "李设计师",
    avatar: "/placeholder-avatar.jpg", 
    rating: 4,
    comment: "整体很不错，但希望能增加更多的创意写作场景模板。",
    date: "2025-01-12",
  },
];

const mockRelatedResources = [
  {
    title: "高级写作润色器",
    description: "专业的文本润色和改进工具，让你的文章更加流畅自然。",
    category: "提示词" as const,
    rating: 4.6,
    downloads: 8420,
    views: 15680,
    tags: ["润色", "改进", "专业"],
    author: "写作专家",
    image: "/src/images/ai-technology.jpg"
  },
  {
    title: "文案创作助手",
    description: "营销文案和广告创意的AI生成工具，提升转化率的利器。",
    category: "提示词" as const,
    rating: 4.5,
    downloads: 6780,
    views: 12450,
    tags: ["营销", "文案", "创意"],
    author: "营销达人",
    image: "/src/images/coding-workflow.jpg"
  }
];

export function ResourceDetail({ onBack, resource }: ResourceDetailProps) {
  const [newComment, setNewComment] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [isDocOpen, setIsDocOpen] = useState(false);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "提示词": return "bg-blue-100 text-blue-800";
      case "MCP": return "bg-green-100 text-green-800";
      case "Dify工具": return "bg-purple-100 text-purple-800";
      case "工作流": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={interactive && onRate ? () => onRate(star) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>返回</span>
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                分享
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Resource Header */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Badge className={getCategoryColor(resource.category)} variant="secondary">
                  {resource.category}
                </Badge>
                <div className="flex items-center space-x-1">
                  {renderStars(resource.rating)}
                  <span className="text-sm font-medium">{resource.rating}</span>
                  <span className="text-sm text-muted-foreground">({mockComments.length} 评价)</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold">{resource.title}</h1>
              <p className="text-lg text-muted-foreground">{resource.description}</p>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>by {resource.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>更新于 {resource.updatedAt}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{resource.views} 浏览</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Download className="h-4 w-4" />
                  <span>{resource.downloads} 下载</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="flex items-center space-x-1">
                    <Tag className="h-3 w-3" />
                    <span>{tag}</span>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Resource Image */}
            <Card>
              <CardContent className="p-0">
                <ImageWithFallback
                  src={resource.image || "/api/placeholder/800/400"}
                  alt={resource.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </CardContent>
            </Card>

            {/* Long Description */}
            <Card>
              <CardHeader>
                <CardTitle>详细说明</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{resource.longDescription}</p>
              </CardContent>
            </Card>

            {/* Documentation */}
            <Card>
              <Collapsible open={isDocOpen} onOpenChange={setIsDocOpen}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-5 w-5" />
                        <span>使用文档</span>
                      </div>
                      <Badge variant="outline">
                        {isDocOpen ? '收起' : '展开'}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{resource.documentation}</code>
                      </pre>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Comments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>评价与评论 ({mockComments.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add Comment */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium">您的评分：</span>
                    {renderStars(userRating, true, setUserRating)}
                  </div>
                  <Textarea
                    placeholder="分享您的使用体验..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button>
                    发表评论
                  </Button>
                </div>

                <Separator />

                {/* Comments List */}
                <div className="space-y-6">
                  {mockComments.map((comment) => (
                    <div key={comment.id} className="flex space-x-4">
                      <Avatar>
                        <AvatarImage src={comment.avatar} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="font-medium">{comment.user}</span>
                            {renderStars(comment.rating)}
                          </div>
                          <span className="text-sm text-muted-foreground">{comment.date}</span>
                        </div>
                        <p className="text-muted-foreground">{comment.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Panel */}
            <Card>
              <CardHeader>
                <CardTitle>版本信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">最新版本</span>
                  <Badge variant="outline">{resource.version}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">文件大小</span>
                  <span className="text-sm">2.3 KB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">兼容性</span>
                  <span className="text-sm">GPT-4, Claude</span>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    <Play className="h-4 w-4 mr-2" />
                    试运行
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline">
                      <RefreshCw className="h-4 w-4 mr-1" />
                      拉取
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      下载
                    </Button>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Heart className="h-4 w-4 mr-2" />
                    收藏 (234)
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>使用统计</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>满意度</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>推荐指数</span>
                    <span>88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>活跃度</span>
                    <span>95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Related Resources */}
            <Card>
              <CardHeader>
                <CardTitle>相关推荐</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockRelatedResources.map((relatedResource, index) => (
                  <div key={index} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex space-x-3">
                      <ImageWithFallback
                        src={relatedResource.image}
                        alt={relatedResource.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2 mb-1">{relatedResource.title}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{relatedResource.description}</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs">{relatedResource.rating}</span>
                          </div>
                          <Badge className={`${getCategoryColor(relatedResource.category)} text-xs`} variant="secondary">
                            {relatedResource.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}