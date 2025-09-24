import { useState } from "react";
import { GitBranch, RefreshCw, Upload, BarChart3, CheckCircle, Clock, AlertCircle, Eye, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface BranchNode {
  id: string;
  name: string;
  status: "synced" | "pending" | "error";
  lastSync: string;
  resourceCount: number;
  contributors: number;
  syncProgress?: number;
  errorMessage?: string;
  ecosystem: {
    totalResources: number;
    activeUsers: number;
    avgRating: number;
    downloads: number;
  };
}

const mockNodes: BranchNode[] = [
  {
    id: "1",
    name: "AI写作节点",
    status: "synced",
    lastSync: "2025-01-20 10:30",
    resourceCount: 124,
    contributors: 23,
    ecosystem: {
      totalResources: 124,
      activeUsers: 456,
      avgRating: 4.6,
      downloads: 12340
    }
  },
  {
    id: "2", 
    name: "代码生成节点",
    status: "pending",
    lastSync: "2025-01-19 16:45",
    resourceCount: 89,
    contributors: 18,
    syncProgress: 65,
    ecosystem: {
      totalResources: 89,
      activeUsers: 234,
      avgRating: 4.4,
      downloads: 8920
    }
  },
  {
    id: "3",
    name: "数据分析节点",
    status: "error",
    lastSync: "2025-01-19 14:20",
    resourceCount: 67,
    contributors: 15,
    errorMessage: "同步失败：网络连接超时",
    ecosystem: {
      totalResources: 67,
      activeUsers: 189,
      avgRating: 4.3,
      downloads: 5670
    }
  },
  {
    id: "4",
    name: "图像处理节点",
    status: "synced",
    lastSync: "2025-01-20 09:15",
    resourceCount: 156,
    contributors: 31,
    ecosystem: {
      totalResources: 156,
      activeUsers: 567,
      avgRating: 4.7,
      downloads: 15670
    }
  }
];

export function BranchNodes() {
  const [selectedNode, setSelectedNode] = useState<BranchNode | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusIcon = (status: string, progress?: number) => {
    switch (status) {
      case "synced":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "synced":
        return "已同步";
      case "pending":
        return "同步中";
      case "error":
        return "出错";
      default:
        return "未知";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "synced":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleNodeDetail = (node: BranchNode) => {
    setSelectedNode(node);
    setIsDialogOpen(true);
  };

  const handleSyncNode = (nodeId: string) => {
    console.log("同步节点:", nodeId);
    // 这里实现同步逻辑
  };

  const handleSubmitImprovement = (nodeId: string) => {
    console.log("提交改进:", nodeId);
    // 这里实现提交改进逻辑
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <GitBranch className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">分节点管理</h1>
            <p className="text-muted-foreground">管理和监控各个生态节点的同步状态</p>
          </div>
        </div>
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          节点设置
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总节点数</p>
                <p className="text-2xl font-bold">{mockNodes.length}</p>
              </div>
              <GitBranch className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">已同步节点</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockNodes.filter(n => n.status === 'synced').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">同步中节点</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {mockNodes.filter(n => n.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">错误节点</p>
                <p className="text-2xl font-bold text-red-600">
                  {mockNodes.filter(n => n.status === 'error').length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Nodes Table */}
      <Card>
        <CardHeader>
          <CardTitle>节点列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>节点名称</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>上次同步时间</TableHead>
                <TableHead>资源数量</TableHead>
                <TableHead>贡献者</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockNodes.map((node) => (
                <TableRow key={node.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <GitBranch className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{node.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(node.status, node.syncProgress)}
                      <Badge className={getStatusColor(node.status)} variant="secondary">
                        {getStatusText(node.status)}
                      </Badge>
                      {node.status === 'pending' && node.syncProgress && (
                        <div className="flex items-center space-x-2">
                          <Progress value={node.syncProgress} className="w-16 h-2" />
                          <span className="text-xs text-muted-foreground">{node.syncProgress}%</span>
                        </div>
                      )}
                    </div>
                    {node.status === 'error' && node.errorMessage && (
                      <p className="text-xs text-red-600 mt-1">{node.errorMessage}</p>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{node.lastSync}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{node.resourceCount}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{node.contributors}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSyncNode(node.id)}
                        disabled={node.status === 'pending'}
                      >
                        <RefreshCw className={`h-4 w-4 mr-1 ${node.status === 'pending' ? 'animate-spin' : ''}`} />
                        拉取
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSubmitImprovement(node.id)}
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        提交
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleNodeDetail(node)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        详情
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Node Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>{selectedNode?.name} - 生态详情</span>
            </DialogTitle>
            <DialogDescription>
              查看该节点的详细市场生态信息和统计数据
            </DialogDescription>
          </DialogHeader>
          
          {selectedNode && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">概览</TabsTrigger>
                <TabsTrigger value="resources">资源</TabsTrigger>
                <TabsTrigger value="contributors">贡献者</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">总资源数</p>
                          <p className="text-xl font-bold">{selectedNode.ecosystem.totalResources}</p>
                        </div>
                        <GitBranch className="h-6 w-6 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">活跃用户</p>
                          <p className="text-xl font-bold">{selectedNode.ecosystem.activeUsers}</p>
                        </div>
                        <Eye className="h-6 w-6 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">平均评分</p>
                          <p className="text-xl font-bold">{selectedNode.ecosystem.avgRating}</p>
                        </div>
                        <BarChart3 className="h-6 w-6 text-yellow-600" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">总下载量</p>
                          <p className="text-xl font-bold">{selectedNode.ecosystem.downloads}</p>
                        </div>
                        <RefreshCw className="h-6 w-6 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">节点健康度</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>资源活跃度</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>用户满意度</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>同步稳定性</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="resources" className="space-y-4">
                <p className="text-sm text-muted-foreground">该节点包含 {selectedNode.ecosystem.totalResources} 个资源，涵盖多个分类领域。</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>提示词资源</span>
                    <Badge variant="outline">64</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>MCP工具</span>
                    <Badge variant="outline">32</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Dify应用</span>
                    <Badge variant="outline">18</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>工作流</span>
                    <Badge variant="outline">10</Badge>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="contributors" className="space-y-4">
                <p className="text-sm text-muted-foreground">该节点有 {selectedNode.contributors} 位活跃贡献者。</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">顶级贡献者</span>
                    <Badge variant="outline">8 位</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">活跃贡献者</span>
                    <Badge variant="outline">15 位</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">新手贡献者</span>
                    <Badge variant="outline">8 位</Badge>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}