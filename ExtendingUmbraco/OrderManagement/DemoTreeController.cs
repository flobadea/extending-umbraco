using System.Net.Http.Formatting;
using Umbraco.Web.Models.Trees;
using Umbraco.Web.Mvc;
using Umbraco.Web.Trees;

namespace ExtendingUmbraco.OrderManagement
{
    //TODO: Uncomment if you want to use multiple trees for a
    //section at the same time. If you comment this later, don't
    //forget to also remove the entry from config/trees.config
    /*
    [Tree("orders", "demoTree")]
    [PluginController("orders")]
    public class DemoTreeController : TreeController
    {
        protected override TreeNode CreateRootNode(FormDataCollection queryStrings)
        {
            var node = base.CreateRootNode(queryStrings);
            node.RoutePath = string.Format("{0}/{1}/{2}",
               "orders", "demoTree", "list");
            return node;

        }
        protected override MenuItemCollection GetMenuForNode(
     string id, FormDataCollection queryStrings)
        {
            return new MenuItemCollection();
        }
        protected override TreeNodeCollection GetTreeNodes(
     string id, FormDataCollection queryStrings)
        {
            var nodes = new TreeNodeCollection();
            if (id == "-1")
            {
                var node = CreateTreeNode("1", "-1", queryStrings,
                   "One", "icon-presentation", false);
                nodes.Add(node);
                node = CreateTreeNode("2", "-1", queryStrings,
                   "Two", "icon-presentation", false);
                nodes.Add(node);
            }
            return nodes;
        }
    }
    */
}