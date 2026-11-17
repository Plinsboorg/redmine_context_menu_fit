# frozen_string_literal: true

Redmine::Plugin.register :redmine_context_menu_fit do
  name 'Context menu fit'
  author 'Dennis Yaskevich'
  description 'Keeps context menu submenus inside the viewport on narrow screens'
  version '0.1.0'
  requires_redmine version_or_higher: '6.1'
end

RedmineContextMenuFit::Hooks
