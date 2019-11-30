using ExtendingUmbraco.OrderManagement.Dtos;
using ExtendingUmbraco.OrderManagement.Entities;
using System;
using System.Collections.Generic;
using Umbraco.Core;
using Umbraco.Core.Persistence;

namespace ExtendingUmbraco.OrderManagement.Repositories
{
    public class ProductsRepository
    {
        private readonly UmbracoDatabase db;
        private readonly DatabaseContext ctx;
        public ProductsRepository()
        {
            ctx = ApplicationContext.Current.DatabaseContext;
            db = ctx.Database;
        }
        public List<Product> GetByCategoryPaged(int categoryId, int page, int pageSize)
        {
            var sql = new Sql()
               .Select("*")
               .From<Product>(ctx.SqlSyntax)
               .Where<Product>(p => p.CategoryId == categoryId, ctx.SqlSyntax)
               .OrderBy<Product>(p => p.Id, ctx.SqlSyntax);
            return db.Fetch<Product>(page, pageSize, sql);
        }
        public Page<Product> GetPaged(int page, int pageSize)
        {
            var countSql = new Sql().Select("count(*)")
               .From<Product>(ctx.SqlSyntax);
            var totalCount = db.ExecuteScalar<long>(countSql);

            var sql = new Sql().Select("Products.*, Categories.CategoryName")
               .From<Product>(ctx.SqlSyntax)
               .InnerJoin<Category>(ctx.SqlSyntax)
               .On<Product, Category>(ctx.SqlSyntax, p => p.CategoryId, c => c.Id)
               .OrderBy<Product>(p => p.Id, ctx.SqlSyntax);

            var items = db.Fetch<Product, Category, Product>((p, c) => {
                p.Category = c;
                return p;
            }, sql);
            return new Page<Product>()
            {
                CurrentPage = page,
                Items = items,
                ItemsPerPage = pageSize,
                TotalItems = totalCount,
                TotalPages = (long)Math.Ceiling(totalCount / (double)pageSize)
            };
        }
        public Page<Product> GetPaged(int page, int pageSize, ProductFilter filter,
string sortColumn = "Id", string sortOrder = "asc")
        {
            var countSql = new Sql().Select("count(*)");
            countSql = ApplyFiltering(countSql, filter);
            var totalCount = db.ExecuteScalar<long>(countSql);

            var sql = new Sql().Select("Products.*, Categories.CategoryName");
            sql = ApplyFiltering(sql, filter);
            RepositoryHelpers.ApplyOrdering(sql, sortColumn, sortOrder);
            var items = db.Fetch<Product, Category, Product>((p, c) => {
                p.Category = c;
                return p;
            }, sql);
            return new Page<Product>()
            {
                CurrentPage = page,
                Items = items,
                ItemsPerPage = pageSize,
                TotalItems = totalCount,
                TotalPages = (long)Math.Ceiling(totalCount / (double)pageSize)
            };
        }
        public Product GetById(int productId)
        {
            return db.SingleOrDefault<Product>(productId);
        }
        public void Delete(int productId)
        {
            db.Delete<Product>(productId);
        }
        public Product Insert(Product product)
        {
            var id = db.Insert("Products", "Id", product);
            return product;
        }
        public void Update(Product product)
        {
            db.Update("Products", "Id", product);
        }

        private Sql ApplyFiltering(Sql sql, ProductFilter filter)
        {
            var res = sql.From<Product>(ctx.SqlSyntax)
               .InnerJoin<Category>(ctx.SqlSyntax)
               .On<Product, Category>(ctx.SqlSyntax,
         p => p.CategoryId, c => c.Id);
            if (!string.IsNullOrEmpty(filter.Name))
            {
                res = res.Where<Product>(
          p => p.Name.ToLower().Contains(filter.Name.ToLower()),
          ctx.SqlSyntax);
            }
            if (!string.IsNullOrEmpty(filter.Description))
            {
                res = res.Where<Product>(
          p => p.Description != null &&
          p.Description.ToLower().Contains(filter.Description.ToLower()),
          ctx.SqlSyntax);
            }
            if (!string.IsNullOrEmpty(filter.CategoryName))
            {
                res = res.Where("Categories.CategoryName like @0", $"%{filter.CategoryName}%");
            }
            return res;
        }

    }
}