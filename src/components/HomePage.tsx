import { Search, Star, Play, Download, Heart, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';
import mcpImage from '../images/MCP.jpg';
import aiImage from '../images/AI.jpg';
import biImage from '../images/BI.jpg';  

interface HomePageProps {
  onResourceClick: (id: string) => void;
}

export function HomePage({ onResourceClick }: HomePageProps) {
  const featuredResources = [
    {
      id: '1',
      title: 'React 组件库',
      description: '现代化的 React UI 组件库，支持 TypeScript，提供丰富的组件和主题定制功能。',
      image: mcpImage,
      rating: 4.8,
      downloads: 15420,
      author: '张三',
      tags: ['React', 'TypeScript', 'UI']
    },
    {
      id: '2',
      title: 'Vue3 后台管理系统',
      description: '基于 Vue3 + Vite 的现代化后台管理系统模板，集成了权限管理、数据可视化等功能。',
      image: aiImage,
      rating: 4.6,
      downloads: 8730,
      author: '李四',
      tags: ['Vue3', 'Vite', '后台']
    },
    {
      id: '3',
      title: 'Node.js API 框架',
      description: '轻量级的 Node.js API 开发框架，支持 RESTful API 和 GraphQL，内置身份认证。',
      image: biImage,
      rating: 4.7,
      downloads: 12340,
      author: '王五',
      tags: ['Node.js', 'API', 'GraphQL']
    }
  ];

  const newResources = [
    {
      id: '4',
      title: 'AI 图像处理工具',
      author: '赵六',
      downloads: 245,
      rating: 4.5,
      tags: ['AI', 'Image']
    },
    {
      id: '5',
      title: 'React Native 模板',
      author: '孙七',
      downloads: 567,
      rating: 4.3,
      tags: ['React Native', 'Mobile']
    },
    {
      id: '6',
      title: 'Python 数据分析',
      author: '周八',
      downloads: 1230,
      rating: 4.9,
      tags: ['Python', 'Data']
    }
  ];

  const topContributors = [
    { name: '张三', contributions: 156, avatar: '/placeholder1.svg' },
    { name: '李四', contributions: 142, avatar: '/placeholder2.svg' },
    { name: '王五', contributions: 128, avatar: '/placeholder3.svg' },
    { name: '赵六', contributions: 98, avatar: '/placeholder4.svg' },
    { name: '孙七', contributions: 87, avatar: '/placeholder5.svg' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Hero Search */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl">发现优质开发资源</h1>
        <p className="text-muted-foreground text-lg">共享知识，加速创新，构建更好的开发生态</p>
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="搜索组件、工具、框架..."
            className="pl-12 h-14 text-lg"
          />
          <Button className="absolute right-2 top-2">
            搜索
          </Button>
        </div>
      </div>

      {/* Featured Resources */}
      <section>
        <h2 className="mb-6">🔥 热门资源</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredResources.map((resource) => (
            <Card key={resource.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onResourceClick(resource.id)}>
              <CardHeader className="p-0">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{resource.rating}</span>
                  </div>
                </div>
                <CardDescription className="text-sm mb-3 line-clamp-2">
                  {resource.description}
                </CardDescription>
                <div className="flex flex-wrap gap-1 mb-3">
                  {resource.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>by {resource.author}</span>
                  <span>{resource.downloads.toLocaleString()} 下载</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="flex gap-2 w-full">
                  <Button size="sm" className="flex-1">
                    <Play className="h-4 w-4 mr-1" />
                    试运行
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* New Resources */}
        <div className="lg:col-span-2">
          <h2 className="mb-6">🆕 最新发布</h2>
          <div className="space-y-4">
            {newResources.map((resource) => (
              <Card key={resource.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onResourceClick(resource.id)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{resource.title}</h3>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {resource.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>by {resource.author}</span>
                        <span>{resource.downloads} 下载</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{resource.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Rankings */}
        <div>
          <h2 className="mb-6">🏆 贡献者排行榜</h2>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                {topContributors.map((contributor, index) => (
                  <div key={contributor.name} className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                      {index + 1}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={contributor.avatar} alt={contributor.name} />
                      <AvatarFallback>{contributor.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{contributor.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {contributor.contributions} 贡献
                      </div>
                    </div>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}