using umbraco.interfaces;

namespace ExtendingUmbraco.OrderManagement
{
    public class CustomAction : IAction
    {
        public char Letter => '1';
        public bool ShowInNotifier => false;
        public bool CanBePermissionAssigned => true;
        public string Icon => "enter";
        public string Alias => "custom";
        public string JsFunctionName => null;
        public string JsSource => null;
    }

}