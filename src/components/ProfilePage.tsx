import { Upload, MessageCircle, Edit3, Star, Award, Calendar, TrendingUp, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';

export function ProfilePage() {
  const userProfile = {
    name: '张三',
    avatar: '/placeholder.svg',
    title: '高级开发者',
    joinDate: '2023-03-15',
    totalPoints: 2840,
    ranking: 12,
    level: 'Gold',
    levelProgress: 70,
    nextLevel: 'Platinum',
    nextLevelPoints: 3500
  };

  const userStats = {
    resourcesUploaded: 23,
    totalDownloads: 45200,
    averageRating: 4.7,
    commentsReceived: 156,
    followersCount: 89,
    followingCount: 34
  };

  const userResources = [
    {
      id: '1',
      title: 'React 组件库',
      category: 'React',
      downloads: 15420,
      rating: 4.8,
      lastUpdate: '2024-01-15',
      status: 'published'
    },
    {
      id: '2',
      title: 'Vue3 工具集',
      category: 'Vue',
      downloads: 8730,
      rating: 4.6,
      lastUpdate: '2024-01-10',
      status: 'published'
    },
    {
      id: '3',
      title: 'TypeScript 类型工具',
      category: 'TypeScript',
      downloads: 5420,
      rating: 4.9,
      lastUpdate: '2024-01-05',
      status: 'draft'
    }
  ];

  const contributionHistory = [
    {
      id: '1',
      type: 'upload',
      title: '上传了 React 组件库',
      date: '2024-01-15',
      points: 100
    },
    {
      id: '2',
      type: 'comment',
      title: '评论了 Vue3 后台管理系统',
      date: '2024-01-14',
      points: 10
    },
    {
      id: '3',
      type: 'improvement',
      title: '改进了 Node.js API 框架',
      date: '2024-01-12',
      points: 50
    },
    {
      id: '4',
      type: 'download',
      title: 'React 组件库达到 15K 下载',
      date: '2024-01-10',
      points: 25
    }
  ];

  const achievements = [
    {
      id: '1',
      name: '首次上传',
      description: '成功上传第一个资源',
      icon: '🎯',
      unlocked: true,
      unlockedDate: '2023-03-16'
    },
    {
      id: '2',
      name: '热门作者',
      description: '资源总下载量超过 10K',
      icon: '🔥',
      unlocked: true,
      unlockedDate: '2023-08-20'
    },
    {
      id: '3',
      name: '评论达人',
      description: '发表评论超过 50 条',
      icon: '💬',
      unlocked: true,
      unlockedDate: '2023-11-05'
    },
    {
      id: '4',
      name: '贡献大师',
      description: '累计贡献超过 20 个资源',
      icon: '👑',
      unlocked: true,
      unlockedDate: '2024-01-01'
    },
    {
      id: '5',
      name: '完美主义者',
      description: '所有资源平均评分超过 4.5',
      icon: '⭐',
      unlocked: false,
      requirement: '平均评分达到 4.5'
    },
    {
      id: '6',
      name: '社区领袖',
      description: '粉丝数量超过 100',
      icon: '👥',
      unlocked: false,
      requirement: '获得 100 位粉丝'
    }
  ];

  const currentTasks = [
    {
      id: '1',
      title: '本周上传 2 个资源',
      progress: 50,
      reward: 200,
      deadline: '2024-01-21'
    },
    {
      id: '2',
      title: '评论 5 个热门资源',
      progress: 80,
      reward: 50,
      deadline: '2024-01-20'
    },
    {
      id: '3',
      title: '获得 10 个赞',
      progress: 30,
      reward: 75,
      deadline: '2024-01-25'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'upload':
        return <Upload className="h-4 w-4 text-green-500" />;
      case 'comment':
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case 'improvement':
        return <Edit3 className="h-4 w-4 text-purple-500" />;
      case 'download':
        return <Download className="h-4 w-4 text-orange-500" />;
      default:
        return <Star className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* User Card */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                  <AvatarFallback className="text-xl">{userProfile.name[0]}</AvatarFallback>
                </Avatar>
                <h1 className="text-xl font-bold">{userProfile.name}</h1>
                <p className="text-muted-foreground">{userProfile.title}</p>
                <Badge variant="outline" className="mt-2">
                  <Award className="h-3 w-3 mr-1" />
                  {userProfile.level} 等级
                </Badge>
              </div>

              {/* Level Progress */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span>升级进度</span>
                  <span>{userProfile.totalPoints} / {userProfile.nextLevelPoints}</span>
                </div>
                <Progress value={userProfile.levelProgress} className="h-2" />
                <p className="text-xs text-muted-foreground text-center">
                  距离 {userProfile.nextLevel} 等级还需 {userProfile.nextLevelPoints - userProfile.totalPoints} 积分
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{userProfile.totalPoints}</div>
                  <div className="text-xs text-muted-foreground">总积分</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-500">#{userProfile.ranking}</div>
                  <div className="text-xs text-muted-foreground">排名</div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>加入时间</span>
                  <span>{userProfile.joinDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>关注者</span>
                  <span>{userStats.followersCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>正在关注</span>
                  <span>{userStats.followingCount}</span>
                </div>
              </div>

              <Button className="w-full mt-4">
                编辑资料
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>📊 贡献统计</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold">{userStats.resourcesUploaded}</div>
                  <div className="text-xs text-muted-foreground">上传资源</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold">{userStats.totalDownloads.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">总下载量</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold">{userStats.averageRating}</div>
                  <div className="text-xs text-muted-foreground">平均评分</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold">{userStats.commentsReceived}</div>
                  <div className="text-xs text-muted-foreground">收到评论</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="resources" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="resources">我的资源</TabsTrigger>
              <TabsTrigger value="activity">贡献历史</TabsTrigger>
              <TabsTrigger value="achievements">成就徽章</TabsTrigger>
              <TabsTrigger value="tasks">任务挑战</TabsTrigger>
            </TabsList>

            {/* My Resources */}
            <TabsContent value="resources">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>📦 我的资源</CardTitle>
                      <CardDescription>管理您上传的所有资源</CardDescription>
                    </div>
                    <Button>
                      <Upload className="h-4 w-4 mr-2" />
                      上传新资源
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userResources.map((resource) => (
                      <Card key={resource.id} className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-medium">{resource.title}</h3>
                              <Badge variant="outline">{resource.category}</Badge>
                              <Badge 
                                variant={resource.status === 'published' ? 'default' : 'secondary'}
                              >
                                {resource.status === 'published' ? '已发布' : '草稿'}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Download className="h-3 w-3" />
                                {resource.downloads.toLocaleString()} 下载
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                {resource.rating} 评分
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {resource.lastUpdate}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">编辑</Button>
                            <Button variant="outline" size="sm">查看</Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity History */}
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>📈 贡献历史</CardTitle>
                  <CardDescription>查看您的所有贡献活动和获得的积分</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contributionHistory.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-4 border rounded-lg">
                        <div className="p-2 bg-muted rounded-full">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.date}</p>
                        </div>
                        <Badge variant="outline" className="text-green-600">
                          +{activity.points} 积分
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Achievements */}
            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle>🏆 成就徽章</CardTitle>
                  <CardDescription>展示您在平台上获得的各种成就</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <Card 
                        key={achievement.id} 
                        className={`p-4 ${achievement.unlocked ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' : 'bg-muted/50'}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`text-2xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-medium ${achievement.unlocked ? '' : 'text-muted-foreground'}`}>
                              {achievement.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {achievement.description}
                            </p>
                            {achievement.unlocked ? (
                              <Badge variant="outline" className="text-xs">
                                <Calendar className="h-3 w-3 mr-1" />
                                {achievement.unlockedDate}
                              </Badge>
                            ) : (
                              <p className="text-xs text-muted-foreground">
                                解锁条件：{achievement.requirement}
                              </p>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tasks & Challenges */}
            <TabsContent value="tasks">
              <Card>
                <CardHeader>
                  <CardTitle>🎯 任务挑战</CardTitle>
                  <CardDescription>完成任务获得额外积分和奖励</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentTasks.map((task) => (
                      <Card key={task.id} className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-medium">{task.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              截止时间：{task.deadline}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-green-600">
                            +{task.reward} 积分
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>进度</span>
                            <span>{task.progress}%</span>
                          </div>
                          <Progress value={task.progress} className="h-2" />
                        </div>
                      </Card>
                    ))}
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="text-center">
                    <h3 className="font-medium mb-2">每日任务</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      完成每日任务获得稳定积分收入
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-lg">👁️</div>
                        <div className="text-sm font-medium">浏览资源</div>
                        <div className="text-xs text-muted-foreground">+5 积分</div>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-lg">💬</div>
                        <div className="text-sm font-medium">发表评论</div>
                        <div className="text-xs text-muted-foreground">+10 积分</div>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-lg">⭐</div>
                        <div className="text-sm font-medium">评分资源</div>
                        <div className="text-xs text-muted-foreground">+5 积分</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}