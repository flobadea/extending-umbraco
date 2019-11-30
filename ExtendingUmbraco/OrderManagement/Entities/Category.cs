using Umbraco.Core.Persistence;
using Umbraco.Core.Persistence.DatabaseAnnotations;

namespace ExtendingUmbraco.OrderManagement.Entities
{
    [TableName("Categories")]
    [ExplicitColumns]
    public class Category
    {
        [PrimaryKeyColumn(AutoIncrement = true)]
        [Column(Name = "Id")]
        public int Id { get; set; }
        [Length(255)]
        [Column(Name = "CategoryName")]
        public string Name { get; set; }
    }

}