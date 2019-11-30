using System;
using Umbraco.Core.Persistence;
using Umbraco.Core.Persistence.DatabaseAnnotations;

namespace ExtendingUmbraco.OrderManagement.Entities
{
    [TableName("Orders")]
    public class Order
    {
        [PrimaryKeyColumn(AutoIncrement = true)]
        public int Id { get; set; }
        public int Status { get; set; }
        public DateTime CreatedAt { get; set; }
        [NullSetting]
        public DateTime? ShippedAt { get; set; }
        [NullSetting]
        public DateTime? DeliveredAt { get; set; }
        public string ShippingAddress { get; set; }
        public bool IsDeleted { get; set; }
        public decimal Total { get; set; }
    }

}