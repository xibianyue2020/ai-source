import { useState } from "react";
import { User, Trophy, Star, Upload, MessageCircle, Calendar, Award, Target, Zap, Crown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

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

export function UserProfile() {
  const [activeTab, setActiveTab] = useState("overview");

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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">概览</TabsTrigger>
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
                        <Badge className={getActivityColor(activity.type)} variant="secondary" className="text-xs">
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
    </div>
  );
}