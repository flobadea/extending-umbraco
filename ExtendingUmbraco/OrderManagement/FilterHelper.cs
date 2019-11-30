using Newtonsoft.Json;

namespace ExtendingUmbraco.OrderManagement
{
    public class FilterHelper
    {
        public static T DeserializeFilter<T>(string filter)
                 where T : class, new()
        {
            if (string.IsNullOrEmpty(filter))
            {
                return new T();
            }
            try
            {
                return JsonConvert.DeserializeObject<T>(filter);
            }
            catch
            {
                return null;
            }
        }
    }

}