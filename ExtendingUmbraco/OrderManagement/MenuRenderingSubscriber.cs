using System.Globalization;
using Umbraco.Core;
using Umbraco.Web.Models.Trees;
using Umbraco.Web.Trees;

namespace ExtendingUmbraco.OrderManagement
{
    public class MenuRenderingSubscriber : ApplicationEventHandler
    {
        protected override void ApplicationStarted(
           UmbracoApplicationBase umbracoApplication,
           ApplicationContext applicationContext)
        {
            TreeControllerBase.MenuRendering
                      += OnMenuRendeing;
        }
        private void OnMenuRendeing(TreeControllerBase sender,
           MenuRenderingEventArgs e)
        {
            if (sender.TreeAlias == "content")
            {
                var culture = CultureInfo.CurrentCulture;
                var label = sender.Services.TextService.Localize("menu2", culture);

                e.Menu.Items.Add<CustomMenuItem, CustomAction>("Custom");
                var menuItem = new MenuItem("menu2", label);
                menuItem.NavigateToRoute("orders/ordersTree/create");
                e.Menu.Items.Add(menuItem);
            }
        }
    }

}