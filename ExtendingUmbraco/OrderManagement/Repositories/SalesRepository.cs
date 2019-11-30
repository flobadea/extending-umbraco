using ExtendingUmbraco.OrderManagement.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Umbraco.Core;
using Umbraco.Core.Persistence;

namespace ExtendingUmbraco.OrderManagement.Repositories
{
    public class SalesRepository
    {
        private readonly UmbracoDatabase db;
        public SalesRepository()
        {
            db = ApplicationContext.Current.DatabaseContext.Database;
        }
        public TopProductDto[] GetTop5Products()
        {
            return db.Query<TopProductDto>(@"select top 5 
p.Name as ProductName, sum(oi.Qty*oi.UnitPrice) as Value 
from Products as p
inner join OrderItems as oi on p.Id=oi.ProductId
group by p.Name
order by sum(oi.Qty*oi.UnitPrice) desc
").ToArray();

        }
        public DailySaleDto[] GetDailySales()
        {
            return db.Query<DailySaleDto>(@"select 
datepart(day, o.CreatedAt) as Day, 
sum(oi.Qty*oi.UnitPrice) as Value from 
Orders as o inner join OrderItems as oi on o.Id=oi.OrderId
where DATEPART(year, o.CreatedAt)=DATEPART(year, getdate()) and
DATEPART(month, o.CreatedAt)=DATEPART(month, getdate())
group by datepart(day, o.CreatedAt)
order by datepart(day, o.CreatedAt)
").ToArray();

        }
    }

}