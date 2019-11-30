using Umbraco.Core.Persistence;
using Umbraco.Core.Persistence.DatabaseAnnotations;

namespace ExtendingUmbraco.OrderManagement.Entities
{
    [TableName("Products")]
    public class Product
    {
        [PrimaryKeyColumn(AutoIncrement = true)]
        public int Id { get; set; }
        [Length(100)]
        public string Name { get; set; }
        [NullSetting(NullSetting = NullSettings.Null)]
        public string Description { get; set; }
        public decimal Price { get; set; }
        [ForeignKey(typeof(Category), Column = "Id", Name = "FK_Product_Category")]
        [Index(IndexTypes.NonClustered)]
        public int CategoryId { get; set; }
        [ResultColumn]
        public Category Category { get; set; }

    }


}