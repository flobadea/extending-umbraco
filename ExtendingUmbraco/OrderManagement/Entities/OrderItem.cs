using Umbraco.Core.Persistence;
using Umbraco.Core.Persistence.DatabaseAnnotations;

namespace ExtendingUmbraco.OrderManagement.Entities
{
    [TableName("OrderItems")]
    public class OrderItem
    {
        [PrimaryKeyColumn(OnColumns = "OrderId,ProductId",
                 AutoIncrement = false)]
        [ForeignKey(typeof(Order), Column = "Id")]
        public int OrderId { get; set; }
        [ForeignKey(typeof(Product), Column = "Id")]
        public int ProductId { get; set; }
        public int Qty { get; set; }
        public decimal UnitPrice { get; set; }
        [ResultColumn]
        public Product Product { get; set; }
    }

}