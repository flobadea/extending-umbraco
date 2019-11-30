using ExtendingUmbraco.OrderManagement.Dtos;
using ExtendingUmbraco.OrderManagement.Entities;
using System.Collections.Generic;
using System.Linq;

namespace ExtendingUmbraco.OrderManagement
{
    public class PropertyMappingService
    {
        private Dictionary<string, string> categoryMappings =
           new Dictionary<string, string>()
           {
         {"id", "Id" },
         {"name", "CategoryName" }
           };
        
        private Dictionary<string, string> productMappings =
      new Dictionary<string, string>()
      {
         {"id", "Id" },
         {"name", "Name" },
         {"description", "Description" },
         {"price", "Price" },
         {"categoryName", "Categories.CategoryName" },
      };
        private IList<IPropertyMapping> _propertyMappings;
        public PropertyMappingService()
        {
            _propertyMappings = new List<IPropertyMapping>();
            _propertyMappings.Add(
      new PropertyMapping<CategoryDto, Category>(categoryMappings));
            _propertyMappings.Add(
      new PropertyMapping<ProductDto, Product>(productMappings));
        }

        public string GetPropertyMapping<TSource, TDestination>(string field)
        {
            var match = _propertyMappings.OfType<PropertyMapping<TSource, TDestination>>();
            if (match.Count() == 1)
            {
                var mappings = match.First().Mappings;
                if (mappings.ContainsKey(field))
                {
                    return mappings[field];
                }
                return null;
            }
            return null;
        }
    }

}