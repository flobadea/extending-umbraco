using System;
using System.Collections.Generic;

namespace ExtendingUmbraco.OrderManagement
{
    public interface IPropertyMapping
    {
    }
    public class PropertyMapping<TSource, TDestination> : IPropertyMapping
    {
        private readonly Dictionary<string, string> mappings;
        public PropertyMapping(Dictionary<string, string> mappings)
        {
            if (mappings == null) throw new ArgumentNullException(nameof(mappings));
            this.mappings = mappings;
        }
        public Dictionary<string, string> Mappings
        {
            get { return mappings; }
        }
    }

}