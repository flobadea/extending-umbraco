using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Umbraco.Core;
using Umbraco.Web.Models.ContentEditing;
using Umbraco.Web.Search;

namespace ExtendingUmbraco.OrderManagement
{
    public class OrderManagementSearch : ISearchableTree
    {
        public string TreeAlias { get { return "ordersTree"; } }

        public IEnumerable<SearchResultItem> Search(
                 string query, int pageSize, long pageIndex,
                 out long totalFound, string searchFrom = null)
        {
            var textService = ApplicationContext.Current.Services.TextService;
            var culture = CultureInfo.CurrentCulture;

            var result = new List<SearchResultItem>();
            var nodes = new Dictionary<string, string>()
   {
      {"1", textService.Localize("ordersMenu", culture) },
      {"2", textService.Localize("productsMenu", culture) },
      {"3", textService.Localize("categoriesMenu", culture) },
   };
            foreach (var item in nodes)
            {
                if (item.Value.ToLower().Contains(query.ToLower()))
                {
                    var res = new SearchResultItem()
                    {
                        ParentId = -1,
                        Icon = "icon-presentation",
                        Id = item.Key,
                        Name = item.Value,
                        Score = 1,
                    };
                    result.Add(res);
                }
            }
            totalFound = result.Count;
            return result.Skip((int)pageIndex * pageSize).Take(pageSize);
        }
    }

}