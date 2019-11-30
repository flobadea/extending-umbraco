using System.Globalization;
using System.Net.Http.Formatting;
using umbraco.BusinessLogic.Actions;
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
            //return CreateMenuSimple(id, queryStrings);
            //return CreateMenuParamRoute(id, queryStrings);
            //return CreateMenuMoreItems(id, queryStrings);
            //return CreateMenuCustomAction(id, queryStrings);
            var textService = ApplicationContext.Services.TextService;
            var culture = CultureInfo.CurrentCulture;
            var menu = new MenuItemCollection();
            if (id == "-1")
            {
                return null;
            }
            else if (id == "3")
            {
                var item = new MenuItem("create",
            textService.Localize(ActionNew.Instance.Alias, culture));
                item.LaunchDialogView("/App_Plugins/orders/categories/category.html",
                   textService.Localize("create", culture));
                item.Icon = "add";
                menu.Items.Add(item);
            }
            else if (id == "2")
            {
                menu.Items.Add<CreateProductMenuItem, ActionNew>(
          textService.Localize(ActionNew.Instance.Alias, culture));
            }

            return menu;

        }
        private MenuItemCollection CreateMenuCustomAction(string id, FormDataCollection queryStrings)
        {
            var textService = ApplicationContext.Services.TextService;
            var culture = CultureInfo.CurrentCulture;
            if (id == "-1")
            {
                return null;
            }
            var menu = new MenuItemCollection();
            //menu.Items.Add<CustomAction>("Custom");
            menu.Items.Add<CustomMenuItem, CustomAction>("Custom"/*or use a localized text*/);
            return menu;
        }
        private MenuItemCollection CreateMenuMoreItems(string id, FormDataCollection queryStrings)
        {
            var textService = ApplicationContext.Services.TextService;
            var culture = CultureInfo.CurrentCulture;
            if (id == "-1")
            {
                return null;
            }
            var menu = new MenuItemCollection();
            menu.Items.Add<CreateChildEntity, ActionNew>
                (textService.Localize(ActionNew.Instance.Alias, culture));

            var menuItem = new MenuItem("menu1", textService.Localize("menu1", culture));
            menuItem.LaunchDialogView(
               "/App_Plugins/orders/backoffice/ordersTree/menu1.html",
               "Are you sure?");
            menuItem.Icon = "add";
            menu.Items.Add(menuItem);

            menuItem = new MenuItem("menu2", textService.Localize("menu2", culture));
            menuItem.SeperatorBefore = true;
            menuItem.NavigateToRoute("orders/ordersTree/create");
            menu.Items.Add(menuItem);

            return menu;
        }
        private MenuItemCollection CreateMenuParamRoute(string id, FormDataCollection queryStrings)
        {
            var textService = ApplicationContext.Services.TextService;
            var culture = CultureInfo.CurrentCulture;
            if (id == "-1")
            {
                return null;
            }
            var menu = new MenuItemCollection();
            menu.Items.Add<CreateChildEntity, ActionNew>
                (textService.Localize(ActionNew.Instance.Alias, culture));
            return menu;
        }
        private MenuItemCollection CreateMenuSimple(string id, FormDataCollection queryStrings)
        {
            var textService = ApplicationContext.Services.TextService;
            var culture = CultureInfo.CurrentCulture;
            if (id == "-1")
            {
                return null;
            }
            var menu = new MenuItemCollection();
            menu.Items.Add<ActionNew>(textService.Localize(
         ActionNew.Instance.Alias, culture));
            return menu;
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