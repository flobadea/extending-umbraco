using ExtendingUmbraco.OrderManagement.Dtos;
using ExtendingUmbraco.OrderManagement.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Umbraco.Core;
using Umbraco.Core.Persistence;

namespace ExtendingUmbraco.OrderManagement.Repositories
{
    public class CategoriesRepository
    {
        private readonly UmbracoDatabase db;
        private readonly DatabaseContext ctx;
        public CategoriesRepository()
        {
            ctx = ApplicationContext.Current.DatabaseContext;
            db = ctx.Database;
        }
        //public Category[] GetAll()
        //{
        //    return db.Query<Category>("select * from Categories").ToArray();
        //}
        //public Category[] GetAll()
        //{
        //    var sql = new Sql().Select("*")
        //       .From<Category>(ctx.SqlSyntax);
        //    return db.Query<Category>(sql).ToArray();
        //}
        public List<Category> GetAll()
        {
            var sql = new Sql().Select("*")
               .From<Category>(ctx.SqlSyntax);
            return db.Fetch<Category>(sql);
        }
        //public List<Category> GetPaged(int page, int pageSize)
        //{
        //    var sql = new Sql().Select("*")
        //       .From<Category>(ctx.SqlSyntax)
        //       .OrderBy<Category>(c => c.Id, ctx.SqlSyntax);
        //    return db.Fetch<Category>(page, pageSize, sql);
        //}
        //public Page<Category> GetPaged(int page, int pageSize)
        //{
        //    var sql = new Sql().Select("*")
        //       .From<Category>(ctx.SqlSyntax)
        //       .OrderBy<Category>(c => c.Id, ctx.SqlSyntax);
        //    return db.Page<Category>(page, pageSize, sql);
        //}
        public Page<Category> GetPaged(int page, int pageSize,
CategoryFilter filter, string sortColumn = "Id", string sortOrder = "asc")
        {
            var sql = new Sql().Select("*")
               .From<Category>(ctx.SqlSyntax);
            if (!string.IsNullOrEmpty(filter.Name))
            {
                sql = sql.Where<Category>(
          c => c.Name.ToLower().Contains(filter.Name.ToLower()),
          ctx.SqlSyntax);
            }
            RepositoryHelpers.ApplyOrdering(sql, sortColumn, sortOrder);

            return db.Page<Category>(page, pageSize, sql);
        }
        public Category GetById(int categoryId)
        {
            return db.SingleOrDefault<Category>(categoryId);
        }
        public void Delete(int categoryId)
        {
            db.Execute("delete from Categories where Id=@0", categoryId);
        }
        public Category Insert(Category category)
        {
            var id = db.Insert("Categories", "Id", category);
            return category;
        }
        public void Update(Category category)
        {
            db.Update("Categories", "Id", category);
        }
        public void UpdateCategory(string name, int id)
        {
            db.Update("Categories", "Id", new { CategoryName = name }, id);
        }
        //public void Delete(int categoryId)
        //{
        //    db.Delete("Categories", "Id", null, categoryId);
        //}
        //public void Delete(int categoryId)
        //{
        //    var category = new Category() { Id = categoryId };
        //    db.Delete("Categories", "Id", category);
        //    //db.Delete<Category>(categoryId);
        //}

    }

}