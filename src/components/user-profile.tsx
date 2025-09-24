import { useState } from "react";
import { User, Trophy, Star, Upload, MessageCircle, Calendar, Award, Target, Zap, Crown, FileText, Tag, Link, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";

interface UserActivity {
  id: string;
  type: "upload" | "comment" | "improve" | "download";
  title: string;
  description: string;
  date: string;
  points: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

interface Task {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  points: number;
  deadline: string;
  completed: boolean;
}

const mockUser = {
  name: "张开发者",
  username: "@zhangdev",
  avatar: "/placeholder-avatar.jpg",
  level: 12,
  points: 8640,
  ranking: 23,
  joinDate: "2024-03-15",
  stats: {
    resourcesUploaded: 15,
    resourcesImproved: 42,
    commentsGiven: 126,
    totalDownloads: 3240,
    avgRating: 4.6
  }
};

const mockActivities: UserActivity[] = [
  {
    id: "1",
    type: "upload",
    title: "上传了新的提示词",
    description: "AI图像描述生成器",
    date: "2025-01-20",
    points: 50
  },
  {
    id: "2",
    type: "improve",
    title: "改进了资源",
    description: "代码注释生成器 - 修复了Python支持问题",
    date: "2025-01-19",
    points: 30
  },
  {
    id: "3",
    type: "comment",
    title: "发表了评论",
    description: "在 'GPT-4 写作助手' 上给出了详细反馈",
    date: "2025-01-18",
    points: 10
  },
  {
    id: "4",
    type: "download",
    title: "下载了资源",
    description: "数据分析MCP工具包",
    date: "2025-01-17",
    points: 5
  }
];

const mockAchievements: Achievement[] = [
  {
    id: "1",
    name: "初来乍到",
    description: "完成第一次资源上传",
    icon: "🌟",
    unlocked: true
  },
  {
    id: "2",
    name: "分享达人",
    description: "上传10个资源",
    icon: "📚",
    unlocked: true
  },
  {
    id: "3",
    name: "评论家",
    description: "发表100条评论",
    icon: "💬",
    unlocked: true
  },
  {
    id: "4",
    name: "贡献专家",
    description: "改进50个资源",
    icon: "🔧",
    unlocked: false,
    progress: 42,
    maxProgress: 50
  },
  {
    id: "5",
    name: "人气王",
    description: "资源总下载量超过5000",
    icon: "🔥",
    unlocked: false,
    progress: 3240,
    maxProgress: 5000
  },
  {
    id: "6",
    name: "满分好评",
    description: "平均评分达到4.8",
    icon: "⭐",
    unlocked: false,
    progress: 46,
    maxProgress: 48
  }
];

const mockTasks: Task[] = [
  {
    id: "1",
    title: "本周上传挑战",
    description: "本周上传3个新资源",
    progress: 1,
    maxProgress: 3,
    points: 150,
    deadline: "2025-01-26",
    completed: false
  },
  {
    id: "2",
    title: "社区互动",
    description: "发表10条有价值的评论",
    progress: 7,
    maxProgress: 10,
    points: 50,
    deadline: "2025-01-25",
    completed: false
  },
  {
    id: "3",
    title: "质量提升",
    description: "改进5个现有资源",
    progress: 5,
    maxProgress: 5,
    points: 100,
    deadline: "2025-01-24",
    completed: true
  }
];

interface ResourceUpload {
  title: string;
  description: string;
  category: string;
  tags: string[];
  fileUrl: string;
  file: File | null;
}

export function UserProfile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState<ResourceUpload>({
    title: "",
    description: "",
    category: "",
    tags: [],
    fileUrl: "",
    file: null
  });
  const [tagInput, setTagInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "upload":
        return <Upload className="h-4 w-4 text-blue-600" />;
      case "improve":
        return <Star className="h-4 w-4 text-yellow-600" />;
      case "comment":
        return <MessageCircle className="h-4 w-4 text-green-600" />;
      case "download":
        return <Trophy className="h-4 w-4 text-purple-600" />;
      default:
        return <User className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "upload":
        return "bg-blue-100 text-blue-800";
      case "improve":
        return "bg-yellow-100 text-yellow-800";
      case "comment":
        return "bg-green-100 text-green-800";
      case "download":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getActivityText = (type: string) => {
    switch (type) {
      case "upload":
        return "上传";
      case "improve":
        return "改进";
      case "comment":
        return "评论";
      case "download":
        return "下载";
      default:
        return "活动";
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setUploadForm(prev => ({ ...prev, file }));
  };

  const addTag = () => {
    if (tagInput.trim() && !uploadForm.tags.includes(tagInput.trim())) {
      setUploadForm(prev => ({ 
        ...prev, 
        tags: [...prev.tags, tagInput.trim()] 
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setUploadForm(prev => ({ 
      ...prev, 
      tags: prev.tags.filter(tag => tag !== tagToRemove) 
    }));
  };

  const handleSubmitUpload = async () => {
    if (!uploadForm.title || !uploadForm.description || !uploadForm.category) {
      alert("请填写所有必填字段");
      return;
    }

    setIsUploading(true);
    
    // 模拟上传过程
    setTimeout(() => {
      // 添加新的活动记录
      const newActivity: UserActivity = {
        id: Date.now().toString(),
        type: "upload",
        title: `上传了新的${uploadForm.category}`,
        description: uploadForm.title,
        date: new Date().toISOString().split('T')[0],
        points: 50
      };
      
      mockActivities.unshift(newActivity);
      mockUser.stats.resourcesUploaded += 1;
      mockUser.points += 50;
      
      // 重置表单
      setUploadForm({
        title: "",
        description: "",
        category: "",
        tags: [],
        fileUrl: "",
        file: null
      });
      setTagInput("");
      setIsUploading(false);
      setShowUploadModal(false);
      
      alert("资源上传成功！获得50积分奖励！");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={mockUser.avatar} />
              <AvatarFallback>
                <User className="h-12 w-12" />
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold">{mockUser.name}</h1>
                <Badge className="bg-primary text-primary-foreground">
                  <Crown className="h-3 w-3 mr-1" />
                  等级 {mockUser.level}
                </Badge>
              </div>
              
              <p className="text-muted-foreground mb-4">{mockUser.username}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{mockUser.points.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">积分</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">#{mockUser.ranking}</p>
                  <p className="text-sm text-muted-foreground">排名</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">{mockUser.stats.resourcesUploaded}</p>
                  <p className="text-sm text-muted-foreground">上传资源</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{mockUser.stats.avgRating}</p>
                  <p className="text-sm text-muted-foreground">平均评分</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>加入于 {mockUser.joinDate}</span>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-4">
                <Button onClick={() => setShowUploadModal(true)}>
                  <Upload className="h-4 w-4 mr-2" />
                  上传资源
                </Button>
                <Button variant="outline">
                  <Zap className="h-4 w-4 mr-2" />
                  查看等级奖励
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="upload">上传资源</TabsTrigger>
          <TabsTrigger value="activities">贡献历史</TabsTrigger>
          <TabsTrigger value="achievements">成就徽章</TabsTrigger>
          <TabsTrigger value="tasks">任务挑战</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle>贡献统计</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">上传资源</span>
                  <Badge variant="outline">{mockUser.stats.resourcesUploaded}</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">改进资源</span>
                  <Badge variant="outline">{mockUser.stats.resourcesImproved}</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">发表评论</span>
                  <Badge variant="outline">{mockUser.stats.commentsGiven}</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">总下载量</span>
                  <Badge variant="outline">{mockUser.stats.totalDownloads.toLocaleString()}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Level Progress */}
            <Card>
              <CardHeader>
                <CardTitle>等级进度</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Crown className="h-5 w-5 text-primary" />
                    <span className="text-lg font-semibold">等级 {mockUser.level}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    距离下一等级还需 360 积分
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>进度</span>
                    <span>8640 / 9000</span>
                  </div>
                  <Progress value={96} className="h-3" />
                </div>
                
                <div className="text-center">
                  <Button variant="outline" size="sm">
                    <Zap className="h-4 w-4 mr-1" />
                    查看等级奖励
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>最近活动</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockActivities.slice(0, 3).map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge className={`${getActivityColor(activity.type)} text-xs`} variant="secondary">
                          {getActivityText(activity.type)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{activity.date}</span>
                        <Badge variant="outline" className="text-xs">
                          +{activity.points}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>上传新资源</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-8">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">分享您的资源</h3>
                <p className="text-muted-foreground mb-6">
                  上传高质量的AI资源，帮助社区成员提升效率，获得积分奖励
                </p>
                <Button size="lg" onClick={() => setShowUploadModal(true)}>
                  <Upload className="h-4 w-4 mr-2" />
                  开始上传
                </Button>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-4">上传指南</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h5 className="font-medium mb-1">高质量内容</h5>
                    <p className="text-sm text-muted-foreground">
                      确保资源内容准确、完整，具有良好的实用性
                    </p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Tag className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h5 className="font-medium mb-1">准确分类</h5>
                    <p className="text-sm text-muted-foreground">
                      选择合适的分类和标签，方便其他用户查找
                    </p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Trophy className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h5 className="font-medium mb-1">获得奖励</h5>
                    <p className="text-sm text-muted-foreground">
                      每次成功上传可获得50积分，提升用户等级
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-4">最近上传</h4>
                <div className="space-y-3">
                  {mockActivities.filter(activity => activity.type === "upload").slice(0, 3).map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      <div className="mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.description}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        +{activity.points}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>贡献历史</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 pb-4 border-b last:border-b-0">
                    <div className="flex-shrink-0 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getActivityColor(activity.type)} variant="secondary">
                          {getActivityText(activity.type)}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{activity.date}</span>
                        <Badge variant="outline">
                          +{activity.points} 积分
                        </Badge>
                      </div>
                      <h4 className="font-medium mb-1">{activity.title}</h4>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>成就徽章</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockAchievements.map((achievement) => (
                  <Card 
                    key={achievement.id} 
                    className={`transition-all duration-200 ${
                      achievement.unlocked 
                        ? 'border-primary/20 bg-primary/5 hover:shadow-md' 
                        : 'opacity-60 hover:opacity-80'
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium mb-1">{achievement.name}</h4>
                          <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
                          
                          {achievement.unlocked ? (
                            <Badge className="bg-green-100 text-green-800" variant="secondary">
                              <Trophy className="h-3 w-3 mr-1" />
                              已解锁
                            </Badge>
                          ) : achievement.progress !== undefined ? (
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>进度</span>
                                <span>{achievement.progress} / {achievement.maxProgress}</span>
                              </div>
                              <Progress 
                                value={(achievement.progress / (achievement.maxProgress || 1)) * 100} 
                                className="h-2" 
                              />
                            </div>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              未解锁
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>任务挑战</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTasks.map((task) => (
                  <Card key={task.id} className={task.completed ? "bg-green-50 border-green-200" : ""}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{task.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                        </div>
                        <Badge 
                          className={`ml-2 ${
                            task.completed 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`} 
                          variant="secondary"
                        >
                          {task.completed ? '已完成' : `+${task.points} 积分`}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>进度</span>
                          <span>{task.progress} / {task.maxProgress}</span>
                        </div>
                        <Progress 
                          value={(task.progress / task.maxProgress) * 100} 
                          className="h-2" 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                        <span>截止日期: {task.deadline}</span>
                        {task.completed && (
                          <Badge className="bg-green-100 text-green-800" variant="secondary">
                            <Trophy className="h-3 w-3 mr-1" />
                            已获得 {task.points} 积分
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>上传资源</span>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowUploadModal(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">资源标题 *</Label>
                  <Input
                    id="title"
                    placeholder="请输入资源标题"
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">资源分类 *</Label>
                  <Select
                    value={uploadForm.category}
                    onValueChange={(value) => setUploadForm(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="选择分类" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="提示词">提示词</SelectItem>
                      <SelectItem value="MCP">MCP</SelectItem>
                      <SelectItem value="Dify工作流">Dify工作流</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">资源描述 *</Label>
                <Textarea
                  id="description"
                  placeholder="请详细描述您的资源..."
                  rows={4}
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label>标签</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="添加标签"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={addTag} size="icon">
                    <Tag className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {uploadForm.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{tag}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">上传文件</Label>
                <div className="border-2 border-dashed border-input rounded-lg p-6 text-center">
                  <Input
                    id="file"
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                    accept=".json,.txt,.md,.py,.js,.ts,.yaml,.yml"
                  />
                  <label htmlFor="file" className="cursor-pointer">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {uploadForm.file ? uploadForm.file.name : "点击选择文件或拖拽文件到此处"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      支持 JSON, TXT, MD, PY, JS, TS, YAML 格式
                    </p>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fileUrl">外部链接（可选）</Label>
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fileUrl"
                    placeholder="https://example.com/resource"
                    className="pl-10"
                    value={uploadForm.fileUrl}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, fileUrl: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowUploadModal(false)}
                  disabled={isUploading}
                >
                  取消
                </Button>
                <Button
                  onClick={handleSubmitUpload}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      上传中...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      确认上传
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}