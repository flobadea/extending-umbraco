using ExtendingUmbraco.OrderManagement.Entities;
using Umbraco.Core;
using Umbraco.Core.Persistence;

namespace ExtendingUmbraco.OrderManagement
{
    public class OrdersHandler : ApplicationEventHandler
    {
        protected override void ApplicationStarting(
     UmbracoApplicationBase umbracoApplication,
     ApplicationContext applicationContext)
        {
            DatabaseContext ctx = ApplicationContext.Current.DatabaseContext;
            DatabaseSchemaHelper dbSchema = new DatabaseSchemaHelper(
      ctx.Database,
                   ApplicationContext.Current.ProfilingLogger.Logger,
                    ctx.SqlSyntax);
            if (!dbSchema.TableExist<Category>())
            {
                dbSchema.CreateTable<Category>(false);
                ctx.Database.Execute("ALTER TABLE Categories ADD CONSTRAINT UC_CategoryName UNIQUE(CategoryName);");
            }
            if (!dbSchema.TableExist<Product>())
            {
                dbSchema.CreateTable<Product>(false);
                ctx.Database.Execute("ALTER TABLE Product ADD CONSTRAINT UC_ProductName UNIQUE(Name);");
            }
            if (!dbSchema.TableExist<Order>())
            {
                dbSchema.CreateTable<Order>(false);
                dbSchema.CreateTable<OrderItem>(false);
            }

        }
    }

}