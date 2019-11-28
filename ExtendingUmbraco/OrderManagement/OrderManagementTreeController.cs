using System.Globalization;
using System.Net.Http.Formatting;
using Umbraco.Web.Models.Trees;
using Umbraco.Web.Mvc;
using Umbraco.Web.Trees;

namespace ExtendingUmbraco.OrderManagement
{
    [Tree("orders", "ordersTree")]
    [PluginController("orders")]
    public class OrderManagementTreeController : TreeController
    {
        protected override MenuItemCollection GetMenuForNode(
                 string id, FormDataCollection queryStrings)
        {
            return new MenuItemCollection();
        }
        protected override TreeNodeCollection GetTreeNodes(
                 string id, FormDataCollection queryStrings)
        {
            //return GetWithNoTranslation(id, queryStrings);
            //return GetWithTranslation(id, queryStrings);
            return GetWithCustomViews(id, queryStrings);
        }
        private TreeNodeCollection GetWithCustomViews(string id, FormDataCollection queryStrings)
        {
            var textService = ApplicationContext.Services.TextService;
            var culture = CultureInfo.CurrentCulture;

            if (id == "-1")
            {
                var nodes = new TreeNodeCollection();
                var node = CreateTreeNode("1", "-1", queryStrings,
            textService.Localize("ordersMenu", culture),
            "icon-presentation", false, "orders/ordersTree/orders");
                nodes.Add(node);
                node = CreateTreeNode("2", "-1", queryStrings,
             textService.Localize("productsMenu", culture),
             "icon-presentation", false, "orders/ordersTree/products");
                nodes.Add(node);
                node = CreateTreeNode("3", "-1", queryStrings,
             textService.Localize("categoriesMenu", culture),
             "icon-presentation", false, "orders/ordersTree/categories");
                nodes.Add(node);
                return nodes;
            }
            return new TreeNodeCollection();
        }
        private TreeNodeCollection GetWithTranslation(string id, FormDataCollection queryStrings)
        {
            var textService = ApplicationContext.Services.TextService;
            var culture = CultureInfo.CurrentCulture;

            if (id == "-1")
            {
                var nodes = new TreeNodeCollection();
                var node = CreateTreeNode("1", "-1", queryStrings,
                   textService.Localize("ordersMenu", culture),
                   "icon-presentation", false);
                nodes.Add(node);
                node = CreateTreeNode("2", "-1", queryStrings,
                   textService.Localize("productsMenu", culture),
                   "icon-presentation", false);
                nodes.Add(node);
                node = CreateTreeNode("3", "-1", queryStrings,
                   textService.Localize("categoriesMenu", culture),
                   "icon-presentation", false);
                nodes.Add(node);
                return nodes;
            }
            return new TreeNodeCollection();
        }
        private TreeNodeCollection GetWithNoTranslation(string id, FormDataCollection queryStrings)
        {
            if (id == "-1")
            {
                var nodes = new TreeNodeCollection();
                var node = CreateTreeNode("1", "-1", queryStrings,
                   "Orders", "icon-presentation", false);
                nodes.Add(node);
                node = CreateTreeNode("2", "-1", queryStrings,
                   "Products", "icon-presentation", false);
                nodes.Add(node);
                node = CreateTreeNode("3", "-1", queryStrings,
                   "Categories", "icon-presentation", false);
                nodes.Add(node);

                return nodes;
            }
            return new TreeNodeCollection();
        }
    }
}