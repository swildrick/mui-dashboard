import type { Meta, StoryObj } from '@storybook/react-vite';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddRounded from '@mui/icons-material/AddRounded';
import AnalyticsRounded from '@mui/icons-material/AnalyticsRounded';
import AssignmentRounded from '@mui/icons-material/AssignmentRounded';
import AutoAwesomeRounded from '@mui/icons-material/AutoAwesomeRounded';
import CalendarTodayRounded from '@mui/icons-material/CalendarTodayRounded';
import CheckBoxOutlineBlankRounded from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import ConstructionRounded from '@mui/icons-material/ConstructionRounded';
import DarkModeRounded from '@mui/icons-material/DarkModeRounded';
import DashboardRounded from '@mui/icons-material/DashboardRounded';
import DevicesRounded from '@mui/icons-material/DevicesRounded';
import HelpRounded from '@mui/icons-material/HelpRounded';
import HomeRounded from '@mui/icons-material/HomeRounded';
import InfoRounded from '@mui/icons-material/InfoRounded';
import InsightsRounded from '@mui/icons-material/InsightsRounded';
import LightModeRounded from '@mui/icons-material/LightModeRounded';
import LogoutRounded from '@mui/icons-material/LogoutRounded';
import MenuRounded from '@mui/icons-material/MenuRounded';
import MoreVertRounded from '@mui/icons-material/MoreVertRounded';
import NavigateNextRounded from '@mui/icons-material/NavigateNextRounded';
import NotificationsRounded from '@mui/icons-material/NotificationsRounded';
import PeopleRounded from '@mui/icons-material/PeopleRounded';
import RemoveRounded from '@mui/icons-material/RemoveRounded';
import SearchRounded from '@mui/icons-material/SearchRounded';
import SettingsRounded from '@mui/icons-material/SettingsRounded';
import SmartphoneRounded from '@mui/icons-material/SmartphoneRounded';
import UnfoldMoreRounded from '@mui/icons-material/UnfoldMoreRounded';
import { FIGMA_NODES, figmaDesign, figmaDocs } from '../figma';

// Every @mui/icons-material icon imported by the dashboard and shared-theme templates.
const icons = {
  AddRounded, AnalyticsRounded, AssignmentRounded, AutoAwesomeRounded, CalendarTodayRounded,
  CheckBoxOutlineBlankRounded, CheckRounded, ChevronRightRounded, ConstructionRounded,
  DarkModeRounded, DashboardRounded, DevicesRounded, HelpRounded, HomeRounded, InfoRounded,
  InsightsRounded, LightModeRounded, LogoutRounded, MenuRounded, MoreVertRounded,
  NavigateNextRounded, NotificationsRounded, PeopleRounded, RemoveRounded, SearchRounded,
  SettingsRounded, SmartphoneRounded, UnfoldMoreRounded,
};

function IconGallery({ fontSize }: { fontSize: 'small' | 'medium' }) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 2, width: '100%' }}>
      {Object.entries(icons).map(([name, Icon]) => (
        <Box key={name} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, p: 1.5, border: 1, borderColor: 'divider', borderRadius: 1 }}>
          <Icon fontSize={fontSize} />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

const meta = {
  title: 'Foundations/Icons',
  component: IconGallery,
  args: { fontSize: 'medium' },
  argTypes: { fontSize: { control: 'inline-radio', options: ['small', 'medium'] } },
  parameters: {
    layout: 'padded',
    ...figmaDesign(FIGMA_NODES.Icons),
    ...figmaDocs(
      'Icons',
      FIGMA_NODES.Icons,
      'The 28 Rounded icons from `@mui/icons-material` that the templates import. `fontSize="small"` is 20px, `medium` is 24px. ' +
        'In Figma each is a local 24px component built from the same SVG path; set the instance size instead of a size variant.',
    ),
  },
} satisfies Meta<typeof IconGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {};
