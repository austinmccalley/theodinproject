namespace :lessons do
  desc 'Prints Average Lesson Durations'
  task :average_duration, [:start_date, :end_date] => :environment do |task, args|
    start_date = DateTime.parse(args.start_date)
    end_date = DateTime.parse(args.end_date)
    Course.all.each do |course|
      puts LessonCompletionDataSerializer.as_json(course, start_date, end_date).to_yaml
    end
  end
end
