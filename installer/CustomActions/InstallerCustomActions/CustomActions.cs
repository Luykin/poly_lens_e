using System;
using System.IO;
using Microsoft.Deployment.WindowsInstaller;


namespace Poly.LensDesktop.Installer
{
    public class CustomActions
    {
        [CustomAction]
        public static ActionResult RemoveApplicationData(Session session)
        {
            session.Log("RemoveApplicationData - begin");

            try
            {
                var roamingAppData = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);
                var lensDataPath = Path.Combine(roamingAppData, "PolyHP", "LensDesktop");

                var lensData = new DirectoryInfo(lensDataPath);
                lensData.Delete(recursive: true);
            }
            catch (Exception e)
            {
                session.Log($"Exception caught while deleting: {e.GetType().Name} - {e.Message}");
                return ActionResult.Failure;
            }

            session.Log("RemoveApplicationData - done");
            return ActionResult.Success;
        }
    }
}
