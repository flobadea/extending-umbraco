using System.Linq;
using Umbraco.Core;

namespace ExtendingUmbraco.OrderManagement
{
    public class Startup: ApplicationEventHandler
    {
        protected override void ApplicationStarted(
            UmbracoApplicationBase umbracoApplication,
            ApplicationContext applicationContext)
        {
            base.ApplicationStarted(umbracoApplication, applicationContext);
            //TODO: Uncomment the next 2 lines if you want 
            //to create sections via the SectionService
            //NOTE: If you use this, make sure to delete 
            //the IApplication implementation
            //var sectionService = applicationContext.Services.SectionService;
            //sectionService.MakeNew("Order Management", "orders", "fa fa-list", 10);

            var userService = applicationContext.Services.UserService;
            var userGroups = userService.GetAllUserGroups();
            foreach (var group in userGroups)
            {
                if (group.Alias != "admin")
                    continue;
                if (group.AllowedSections.Contains("orders") == false)
                {
                    group.AddAllowedSection("orders");
                    userService.Save(group, raiseEvents: false);
                }
            }
        }

    }
}