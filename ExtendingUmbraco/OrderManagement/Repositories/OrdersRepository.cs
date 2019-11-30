using ExtendingUmbraco.OrderManagement.Entities;
using System;
using System.Linq;
using System.Transactions;
using Umbraco.Core;
using Umbraco.Core.Persistence;

namespace ExtendingUmbraco.OrderManagement.Repositories
{
    public class OrdersRepository
    {
        private readonly UmbracoDatabase db;
        private readonly DatabaseContext ctx;
        public OrdersRepository()
        {
            ctx = ApplicationContext.Current.DatabaseContext;
            db = ctx.Database;
        }
        public Page<Order> GetPaged(int page, int pageSize, string orderBy)
        {
            var sql = new Sql().Select("*")
               .From<Order>(ctx.SqlSyntax)
               .Where<Order>(o => o.IsDeleted == false, ctx.SqlSyntax)
               .OrderBy(orderBy ?? "Id");
            return db.Page<Order>(page, pageSize, sql);
        }
        public Order GetById(int orderId)
        {
            return db.SingleOrDefault<Order>(orderId);
        }
        public Page<OrderItem> GetOrderItems(int orderId, int page, int pageSize)
        {
            var countSql = new Sql().Select("*")
               .From<OrderItem>(ctx.SqlSyntax)
               .Where<OrderItem>(oi => oi.OrderId == orderId, ctx.SqlSyntax);
            var totalCount = db.ExecuteScalar<long>(countSql);

            var sql = new Sql().Select("OrderItems.*, Products.Name")
               .From<OrderItem>(ctx.SqlSyntax)
               .InnerJoin<Product>(ctx.SqlSyntax)
               .On<OrderItem, Product>(ctx.SqlSyntax, oi => oi.ProductId, p => p.Id)
               .Where<OrderItem>(oi => oi.OrderId == orderId, ctx.SqlSyntax)
               .OrderBy<OrderItem>(oi => oi.ProductId, ctx.SqlSyntax);

            var items = db.Fetch<OrderItem, Product, OrderItem>((oi, p) =>
            {
                oi.Product = p;
                return oi;
            }, sql);

            return new Page<OrderItem>()
            {
                CurrentPage = page,
                Items = items,
                ItemsPerPage = pageSize,
                TotalItems = totalCount,
                TotalPages = (long)Math.Ceiling(totalCount / (double)pageSize)
            };
        }
        public void Insert(Order order, OrderItem[] items)
        {
            using (var tx = new TransactionScope())
            {
                order.Total = items.Sum(p => p.Qty * p.UnitPrice);
                db.Insert("Orders", "Id", order);
                foreach (var item in items)
                {
                    item.OrderId = order.Id;
                    db.Insert("OrderItems", "OrderId,ProductId", item);
                }
                tx.Complete();
            }
        }
        public void Delete(int orderId)
        {
            db.Update("Orders", "Id", new { IsDeleted = true }, orderId);
        }
        public void Update(Order order)
        {
            db.Update("Orders", "Id", order);
        }

    }

}