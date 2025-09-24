import { Star, Trophy, Target, Gift, TrendingUp, Award, Crown, Medal } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';

export function IncentivePage() {
  const pointsSystem = {
    ways: [
      { action: '上传资源', points: 100, icon: '📤', description: '分享有价值的开发资源' },
      { action: '资源被下载', points: 5, icon: '⬇️', description: '每次下载获得积分' },
      { action: '收到好评', points: 20, icon: '⭐', description: '资源获得 4 星及以上评价' },
      { action: '发表评论', points: 10, icon: '💬', description: '为他人资源提供有价值的评论' },
      { action: '改进资源', points: 50, icon: '🔧', description: '提交代码改进或优化建议' },
      { action: '每日签到', points: 5, icon: '📅', description: '保持活跃，每日登录' }
    ],
    usage: [
      { item: '购买徽章', cost: 500, icon: '🏆', description: '解锁特殊成就徽章' },
      { item: '资源置顶', cost: 200, icon: '📌', description: '让你的资源获得更多曝光' },
      { item: '专属头像框', cost: 300, icon: '🖼️', description: '彰显身份的个性化装饰' },
      { item: '私信功能', cost: 100, icon: '✉️', description: '与其他开发者私下交流' },
      { item: '高级统计', cost: 150, icon: '📊', description: '获得详细的数据分析报告' }
    ]
  };

  const contributorRanking = [
    { rank: 1, name: '张三', points: 3250, avatar: '/placeholder1.svg', level: 'Platinum', change: 0 },
    { rank: 2, name: '李四', points: 2980, avatar: '/placeholder2.svg', level: 'Gold', change: 1 },
    { rank: 3, name: '王五', points: 2840, avatar: '/placeholder3.svg', level: 'Gold', change: -1 },
    { rank: 4, name: '赵六', points: 2650, avatar: '/placeholder4.svg', level: 'Gold', change: 2 },
    { rank: 5, name: '孙七', points: 2420, avatar: '/placeholder5.svg', level: 'Silver', change: 0 },
    { rank: 6, name: '周八', points: 2180, avatar: '/placeholder6.svg', level: 'Silver', change: -2 },
    { rank: 7, name: '吴九', points: 1950, avatar: '/placeholder7.svg', level: 'Silver', change: 1 },
    { rank: 8, name: '郑十', points: 1820, avatar: '/placeholder8.svg', level: 'Bronze', change: 0 }
  ];

  const nodeRanking = [
    { rank: 1, name: '北京节点', resources: 156, downloads: 45200, score: 92.5, change: 0 },
    { rank: 2, name: '上海节点', resources: 142, downloads: 38900, score: 89.2, change: 1 },
    { rank: 3, name: '深圳节点', resources: 134, downloads: 32100, score: 85.7, change: -1 },
    { rank: 4, name: '杭州节点', resources: 98, downloads: 28600, score: 82.3, change: 0 },
    { rank: 5, name: '成都节点', resources: 87, downloads: 21400, score: 78.9, change: 2 }
  ];

  const challenges = [
    {
      id: '1',
      title: '新年冲刺挑战',
      description: '在1月份上传3个高质量资源',
      progress: 66,
      current: 2,
      target: 3,
      reward: '500积分 + 特殊徽章',
      deadline: '2024-01-31',
      participants: 234,
      status: 'active'
    },
    {
      id: '2',
      title: '社区贡献者',
      description: '本月获得50个赞',
      progress: 84,
      current: 42,
      target: 50,
      reward: '300积分 + 头像框',
      deadline: '2024-01-31',
      participants: 156,
      status: 'active'
    },
    {
      id: '3',
      title: '代码评审大师',
      description: '完成10次代码改进建议',
      progress: 30,
      current: 3,
      target: 10,
      reward: '800积分 + 专属称号',
      deadline: '2024-02-15',
      participants: 89,
      status: 'active'
    }
  ];

  const badges = [
    {
      id: '1',
      name: '初学者',
      description: '成功注册并完成首次登录',
      icon: '🌱',
      rarity: 'common',
      unlocked: true,
      holders: 1234
    },
    {
      id: '2',
      name: '贡献新星',
      description: '上传第一个资源',
      icon: '⭐',
      rarity: 'common',
      unlocked: true,
      holders: 856
    },
    {
      id: '3',
      name: '代码艺术家',
      description: '上传的资源获得超过100次下载',
      icon: '🎨',
      rarity: 'uncommon',
      unlocked: true,
      holders: 234
    },
    {
      id: '4',
      name: '社区领袖',
      description: '获得超过50个关注者',
      icon: '👑',
      rarity: 'rare',
      unlocked: false,
      holders: 67
    },
    {
      id: '5',
      name: '传奇开发者',
      description: '总贡献积分超过5000',
      icon: '🏆',
      rarity: 'legendary',
      unlocked: false,
      holders: 12
    },
    {
      id: '6',
      name: '完美主义者',
      description: '所有资源平均评分超过4.8',
      icon: '💎',
      rarity: 'epic',
      unlocked: false,
      holders: 28
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-100 border-gray-300 text-gray-700';
      case 'uncommon':
        return 'bg-green-100 border-green-300 text-green-700';
      case 'rare':
        return 'bg-blue-100 border-blue-300 text-blue-700';
      case 'epic':
        return 'bg-purple-100 border-purple-300 text-purple-700';
      case 'legendary':
        return 'bg-yellow-100 border-yellow-300 text-yellow-700';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-700';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Bronze':
        return 'text-orange-600';
      case 'Silver':
        return 'text-gray-500';
      case 'Gold':
        return 'text-yellow-500';
      case 'Platinum':
        return 'text-purple-500';
      default:
        return 'text-gray-400';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-orange-500" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-3 w-3 text-green-500" />;
    if (change < 0) return <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />;
    return <div className="w-3 h-3" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">🎮 激励机制</h1>
        <p className="text-muted-foreground">
          通过积分、徽章和排行榜激励社区贡献，让开发变得更有趣
        </p>
      </div>

      <Tabs defaultValue="points" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="points">积分系统</TabsTrigger>
          <TabsTrigger value="leaderboard">排行榜</TabsTrigger>
          <TabsTrigger value="badges">徽章墙</TabsTrigger>
          <TabsTrigger value="challenges">任务挑战</TabsTrigger>
        </TabsList>

        {/* Points System */}
        <TabsContent value="points">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* How to Earn Points */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  积分获取方式
                </CardTitle>
                <CardDescription>
                  通过各种贡献活动获得积分奖励
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pointsSystem.ways.map((way, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="text-2xl">{way.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{way.action}</span>
                        <Badge variant="outline" className="text-green-600">
                          +{way.points} 积分
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{way.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* How to Use Points */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-purple-500" />
                  积分消耗方式
                </CardTitle>
                <CardDescription>
                  使用积分解锁特殊功能和奖励
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pointsSystem.usage.map((usage, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="text-2xl">{usage.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{usage.item}</span>
                        <Badge variant="outline" className="text-red-600">
                          {usage.cost} 积分
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{usage.description}</p>
                    </div>
                    <Button variant="outline" size="sm">兑换</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Leaderboard */}
        <TabsContent value="leaderboard">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contributor Ranking */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  贡献者排行榜
                </CardTitle>
                <CardDescription>
                  根据总积分排名的优秀贡献者
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contributorRanking.map((user) => (
                    <div key={user.rank} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50">
                      <div className="flex items-center justify-center w-8">
                        {getRankIcon(user.rank)}
                      </div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{user.name}</span>
                          <Badge variant="outline" className={getLevelColor(user.level)}>
                            {user.level}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {user.points.toLocaleString()} 积分
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {getChangeIcon(user.change)}
                        {user.change !== 0 && (
                          <span className={`text-xs ${user.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {Math.abs(user.change)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Node Ranking */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  分节点排行榜
                </CardTitle>
                <CardDescription>
                  各地区节点的资源贡献排名
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {nodeRanking.map((node) => (
                    <div key={node.rank} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50">
                      <div className="flex items-center justify-center w-8">
                        {getRankIcon(node.rank)}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{node.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {node.resources} 资源 · {node.downloads.toLocaleString()} 下载
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-primary">{node.score}</div>
                        <div className="text-xs text-muted-foreground">评分</div>
                      </div>
                      <div className="flex items-center gap-1">
                        {getChangeIcon(node.change)}
                        {node.change !== 0 && (
                          <span className={`text-xs ${node.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {Math.abs(node.change)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Badges */}
        <TabsContent value="badges">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-500" />
                成就徽章墙
              </CardTitle>
              <CardDescription>
                收集各种成就徽章，展示您的技能和贡献
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {badges.map((badge) => (
                  <Card 
                    key={badge.id} 
                    className={`p-4 relative ${badge.unlocked ? '' : 'opacity-60'} ${getRarityColor(badge.rarity)} border-2`}
                  >
                    <div className="text-center">
                      <div className={`text-4xl mb-2 ${badge.unlocked ? '' : 'grayscale'}`}>
                        {badge.icon}
                      </div>
                      <h3 className="font-medium mb-1">{badge.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {badge.description}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <Badge variant="outline" className="capitalize">
                          {badge.rarity}
                        </Badge>
                        <span className="text-muted-foreground">
                          {badge.holders} 人拥有
                        </span>
                      </div>
                      {badge.unlocked && (
                        <div className="absolute -top-2 -right-2">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Challenges */}
        <TabsContent value="challenges">
          <div className="space-y-6">
            {/* Active Challenges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-500" />
                  当前挑战
                </CardTitle>
                <CardDescription>
                  参与限时挑战，获得丰厚奖励
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {challenges.map((challenge) => (
                    <Card key={challenge.id} className="p-4">
                      <div className="mb-4">
                        <h3 className="font-medium mb-1">{challenge.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {challenge.description}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {challenge.participants} 人参与
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>进度</span>
                            <span>{challenge.current} / {challenge.target}</span>
                          </div>
                          <Progress value={challenge.progress} className="h-2" />
                        </div>
                        
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-sm font-medium text-green-600">
                            🎁 {challenge.reward}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>截止：{challenge.deadline}</span>
                          <Badge variant={challenge.status === 'active' ? 'default' : 'secondary'}>
                            {challenge.status === 'active' ? '进行中' : '已结束'}
                          </Badge>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-4" size="sm">
                        {challenge.progress === 100 ? '领取奖励' : '参与挑战'}
                      </Button>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Goals */}
            <Card>
              <CardHeader>
                <CardTitle>📅 本周目标</CardTitle>
                <CardDescription>
                  完成每周目标获得额外积分奖励
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl mb-2">📤</div>
                    <h3 className="font-medium mb-1">上传 2 个资源</h3>
                    <Progress value={50} className="h-2 mb-2" />
                    <p className="text-sm text-muted-foreground">1/2 完成</p>
                    <Badge variant="outline" className="mt-2">+200 积分</Badge>
                  </div>
                  
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl mb-2">💬</div>
                    <h3 className="font-medium mb-1">发表 10 条评论</h3>
                    <Progress value={70} className="h-2 mb-2" />
                    <p className="text-sm text-muted-foreground">7/10 完成</p>
                    <Badge variant="outline" className="mt-2">+100 积分</Badge>
                  </div>
                  
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl mb-2">⭐</div>
                    <h3 className="font-medium mb-1">获得 50 个赞</h3>
                    <Progress value={84} className="h-2 mb-2" />
                    <p className="text-sm text-muted-foreground">42/50 完成</p>
                    <Badge variant="outline" className="mt-2">+150 积分</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}