import { Star, Download, Heart, Play, RefreshCw, Clock, User, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface ResourceDetailPageProps {
  resourceId: string;
}

export function ResourceDetailPage({ resourceId }: ResourceDetailPageProps) {
  const [isDocOpen, setIsDocOpen] = useState(false);
  const [newComment, setNewComment] = useState('');

  // Mock data based on resourceId
  const resource = {
    id: resourceId,
    title: 'React 组件库',
    description: '现代化的 React UI 组件库，支持 TypeScript，提供丰富的组件和主题定制功能。这是一个经过精心设计的组件库，适用于各种规模的项目。',
    version: 'v2.1.4',
    lastUpdate: '2024-01-15',
    downloads: 15420,
    rating: 4.8,
    totalRatings: 234,
    author: '张三',
    authorAvatar: '/placeholder.svg',
    tags: ['React', 'TypeScript', 'UI', 'Components'],
    image: 'https://images.unsplash.com/photo-1599408443565-829a8dfd7e9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwcmVzb3VyY2VzfGVufDF8fHx8MTc1ODY3NzU4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  };

  const comments = [
    {
      id: '1',
      user: '李四',
      avatar: '/placeholder1.svg',
      rating: 5,
      comment: '非常好用的组件库，文档详细，上手简单！',
      time: '2024-01-10'
    },
    {
      id: '2',
      user: '王五',
      avatar: '/placeholder2.svg',
      rating: 4,
      comment: '整体不错，希望能增加更多的图表组件。',
      time: '2024-01-08'
    },
    {
      id: '3',
      user: '赵六',
      avatar: '/placeholder3.svg',
      rating: 5,
      comment: 'TypeScript 支持很棒，类型定义非常完善。',
      time: '2024-01-05'
    }
  ];

  const relatedResources = [
    {
      id: '2',
      title: 'Vue3 UI 组件库',
      author: '李四',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1700887944225-f148dd124305?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdG9vbHMlMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NTg2NzI0Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: '3',
      title: 'Angular Material 扩展',
      author: '王五',
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1556792189-55769c8dfbac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwZGV2ZWxvcG1lbnQlMjBwcm9ncmFtbWluZ3xlbnwxfHx8fDE3NTg2Nzc1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: '4',
      title: 'Tailwind CSS 组件',
      author: '赵六',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1599408443565-829a8dfd7e9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwcmVzb3VyY2VzfGVufDF8fHx8MTc1ODY3NzU4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Resource Header */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-48 h-32 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {resource.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-2xl mb-2">{resource.title}</CardTitle>
                  <CardDescription className="mb-4">
                    {resource.description}
                  </CardDescription>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>by {resource.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>更新于 {resource.lastUpdate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      <span>{resource.downloads.toLocaleString()} 下载</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Version & Actions */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium">版本信息</h3>
                  <p className="text-sm text-muted-foreground">
                    最新版本：{resource.version}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    拉取
                  </Button>
                  <Button variant="outline">
                    <Play className="h-4 w-4 mr-2" />
                    试运行
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    下载
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documentation */}
          <Card>
            <Collapsible open={isDocOpen} onOpenChange={setIsDocOpen}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50">
                  <div className="flex items-center justify-between">
                    <CardTitle>📖 资源说明文档</CardTitle>
                    {isDocOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="prose prose-sm max-w-none">
                  <h3>安装使用</h3>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>{`npm install @myorg/react-components
import { Button, Card } from '@myorg/react-components'`}</code>
                  </pre>
                  
                  <h3>特性</h3>
                  <ul>
                    <li>🎨 现代化设计语言</li>
                    <li>📱 完全响应式设计</li>
                    <li>🔧 TypeScript 原生支持</li>
                    <li>🎯 无障碍访问（a11y）</li>
                    <li>🌙 深色模式支持</li>
                  </ul>

                  <h3>组件列表</h3>
                  <p>包含 30+ 常用组件：Button、Card、Modal、Table、Form、Chart 等。</p>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Comments */}
          <Card>
            <CardHeader>
              <CardTitle>💬 评分与评论</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Rating Summary */}
              <div className="flex items-center gap-6 p-4 bg-muted rounded-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold">{resource.rating}</div>
                  <div className="flex items-center gap-1 mt-1">
                    {renderStars(resource.rating)}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {resource.totalRatings} 评价
                  </div>
                </div>
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center gap-2 mb-1">
                      <span className="text-sm w-3">{stars}</span>
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <div className="flex-1 bg-secondary h-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-400"
                          style={{ width: `${Math.random() * 80 + 10}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comment Form */}
              <div className="space-y-3">
                <h4 className="font-medium">发表评论</h4>
                <Textarea
                  placeholder="分享您的使用体验..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {renderStars(0)}
                    <span className="text-sm text-muted-foreground ml-2">点击星星评分</span>
                  </div>
                  <Button>发布评论</Button>
                </div>
              </div>

              <Separator />

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={comment.avatar} alt={comment.user} />
                      <AvatarFallback>{comment.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{comment.user}</span>
                        <div className="flex items-center gap-1">
                          {renderStars(comment.rating)}
                        </div>
                        <span className="text-sm text-muted-foreground">{comment.time}</span>
                      </div>
                      <p className="text-sm">{comment.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Author Info */}
          <Card>
            <CardHeader>
              <CardTitle>👨‍💻 作者信息</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={resource.authorAvatar} alt={resource.author} />
                  <AvatarFallback>{resource.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{resource.author}</div>
                  <div className="text-sm text-muted-foreground">高级开发者</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>贡献资源</span>
                  <span>23 个</span>
                </div>
                <div className="flex justify-between">
                  <span>获得下载</span>
                  <span>45.2K</span>
                </div>
                <div className="flex justify-between">
                  <span>平均评分</span>
                  <span>4.7 ⭐</span>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">
                查看所有资源
              </Button>
            </CardContent>
          </Card>

          {/* Related Resources */}
          <Card>
            <CardHeader>
              <CardTitle>🔗 相关资源推荐</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {relatedResources.map((item) => (
                <div key={item.id} className="flex gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-md -m-2">
                  <div className="w-16 h-12 rounded overflow-hidden">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">by {item.author}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{item.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}