interface ImageInfo
{
  name: string;
  base64: string;
}

interface PositionInfo
{
  name?: string;
  x: number;
  y: number;
  w: number;
  h: number;
}


interface SaleMan
{
  doing_count: number;
  id: number;
  name: string;               // 组号_姓名
  ranking_amount: number;
  ranking_task: number;
  todo_count: number;
  total_amount: number;
  waiting_pay: number;
}

interface SaleData
{
  amount: number;
  current_time: string;
  msg?: string;
  result: SaleMan[];
  status?: number;
}
