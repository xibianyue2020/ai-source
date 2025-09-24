import { RefreshCw, Upload, BarChart3, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Progress } from './ui/progress';

export function NodesPage() {
  const nodes = [
    {
      id: '1',
      name: '北京节点',
      status: 'synced',
      lastSync: '2024-01-15 14:30',
      resources: 156,
      syncProgress: 100,
      region: '华北'
    },
    {
      id: '2',
      name: '上海节点',
      status: 'syncing',
      lastSync: '2024-01-15 14:25',
      resources: 142,
      syncProgress: 75,
      region: '华东'
    },
    {
      id: '3',
      name: '深圳节点',
      status: 'pending',
      lastSync: '2024-01-15 12:15',
      resources: 98,
      syncProgress: 0,
      region: '华南'
    },
    {
      id: '4',
      name: '成都节点',
      status: 'error',
      lastSync: '2024-01-15 10:20',
      resources: 87,
      syncProgress: 0,
      region: '西南'
    },
    {
      id: '5',
      name: '西安节点',
      status: 'synced',
      lastSync: '2024-01-15 14:28',
      resources: 134,
      syncProgress: 100,
      region: '西北'
    }
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'synced':
        return {
          label: '已同步',
          variant: 'default' as const,
          icon: CheckCircle,
          color: 'text-green-500'
        };
      case 'syncing':
        return {
          label: '同步中',
          variant: 'secondary' as const,
          icon: RefreshCw,
          color: 'text-blue-500'
        };
      case 'pending':
        return {
          label: '待同步',
          variant: 'outline' as const,
          icon: Clock,
          color: 'text-yellow-500'
        };
      case 'error':
        return {
          label: '同步失败',
          variant: 'destructive' as const,
          icon: AlertCircle,
          color: 'text-red-500'
        };
      default:
        return {
          label: '未知',
          variant: 'outline' as const,
          icon: AlertCircle,
          color: 'text-gray-500'
        };
    }
  };

  const NodeDetailDialog = ({ node }: { node: typeof nodes[0] }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <BarChart3 className="h-4 w-4 mr-1" />
          详情
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{node.name} - 生态市场详情</DialogTitle>
          <DialogDescription>
            查看该节点的资源分布和市场活跃度
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{node.resources}</div>
                <div className="text-sm text-muted-foreground">总资源数</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-500">89</div>
                <div className="text-sm text-muted-foreground">活跃用户</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-500">23</div>
                <div className="text-sm text-muted-foreground">本月新增</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-500">4.6</div>
                <div className="text-sm text-muted-foreground">平均评分</div>
              </CardContent>
            </Card>
          </div>

          {/* Resource Categories */}
          <Card>
            <CardHeader>
              <CardTitle>资源分类分布</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'React 组件', count: 45, percentage: 65 },
                  { name: 'Vue 组件', count: 32, percentage: 46 },
                  { name: 'Node.js 工具', count: 28, percentage: 40 },
                  { name: 'Python 脚本', count: 25, percentage: 36 },
                  { name: '其他', count: 26, percentage: 37 }
                ].map((category) => (
                  <div key={category.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{category.name}</span>
                      <span>{category.count} 个</span>
                    </div>
                    <Progress value={category.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Contributors */}
          <Card>
            <CardHeader>
              <CardTitle>节点贡献者</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { name: '张三', contributions: 12 },
                  { name: '李四', contributions: 8 },
                  { name: '王五', contributions: 6 },
                  { name: '赵六', contributions: 4 }
                ].map((contributor, index) => (
                  <div key={contributor.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        {index + 1}
                      </div>
                      <span className="text-sm">{contributor.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{contributor.contributions} 个资源</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">🌐 分节点管理</h1>
        <p className="text-muted-foreground">
          管理各地区分节点，同步资源生态，查看节点市场活跃度
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">已同步节点</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <RefreshCw className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">1</div>
                <div className="text-sm text-muted-foreground">同步中节点</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">1</div>
                <div className="text-sm text-muted-foreground">待同步节点</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">1</div>
                <div className="text-sm text-muted-foreground">异常节点</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Nodes Table */}
      <Card>
        <CardHeader>
          <CardTitle>节点列表</CardTitle>
          <CardDescription>
            管理所有分节点的同步状态和资源信息
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>节点名称</TableHead>
                <TableHead>地区</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>资源数量</TableHead>
                <TableHead>上次同步时间</TableHead>
                <TableHead>同步进度</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nodes.map((node) => {
                const statusConfig = getStatusConfig(node.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <TableRow key={node.id}>
                    <TableCell className="font-medium">{node.name}</TableCell>
                    <TableCell>{node.region}</TableCell>
                    <TableCell>
                      <Badge variant={statusConfig.variant} className="flex items-center gap-1 w-fit">
                        <StatusIcon className={`h-3 w-3 ${statusConfig.color}`} />
                        {statusConfig.label}
                      </Badge>
                    </TableCell>
                    <TableCell>{node.resources}</TableCell>
                    <TableCell className="text-sm">{node.lastSync}</TableCell>
                    <TableCell>
                      {node.status === 'syncing' ? (
                        <div className="space-y-1">
                          <Progress value={node.syncProgress} className="h-2" />
                          <span className="text-xs text-muted-foreground">{node.syncProgress}%</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          {node.status === 'synced' ? '100%' : '-'}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" disabled={node.status === 'syncing'}>
                          <RefreshCw className={`h-4 w-4 mr-1 ${node.status === 'syncing' ? 'animate-spin' : ''}`} />
                          拉取
                        </Button>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-1" />
                          提交
                        </Button>
                        <NodeDetailDialog node={node} />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium mb-1">批量操作</h3>
              <p className="text-sm text-muted-foreground">
                对所有节点执行批量同步或更新操作
              </p>
            </div>
            <div className="flex gap-2">
              <Button>
                <RefreshCw className="h-4 w-4 mr-2" />
                全量同步
              </Button>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                批量提交
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}